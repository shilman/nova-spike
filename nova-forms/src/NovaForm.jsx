import React, { PropTypes, Component } from 'react'
import Formsy from 'formsy-react'
import { Button } from 'react-bootstrap'
import { _ } from 'underscore'
//import { Meteor } from 'nova-core'

import FormComponent from './FormComponent'
import Utils from './utils.js'

/*

1. Constructor
2. Helpers
3. Errors
4. Context
4. Method & Callback
5. Render

*/

class NovaForm extends Component {

  // --------------------------------------------------------------------- //
  // ----------------------------- Constructor --------------------------- //
  // --------------------------------------------------------------------- //

  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.methodCallback = this.methodCallback.bind(this)
    this.addToAutofilledValues = this.addToAutofilledValues.bind(this)
    this.throwError = this.throwError.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
    this.updateCurrentValue = this.updateCurrentValue.bind(this)

    // a debounced version of seState that only updates state every 500 ms (not used)
    this.debouncedSetState = _.debounce(this.setState, 500)

    this.state = {
      disabled: false,
      errors: [],
      autofilledValues: {},
      currentValues: {},
    }
  }

  // --------------------------------------------------------------------- //
  // ------------------------------- Helpers ----------------------------- //
  // --------------------------------------------------------------------- //

  // if a document is being passed, this is an edit form
  getFormType() {
    return this.props.document ? 'edit' : 'new'
  }

  // get relevant fields
  getFieldNames() {
    const { collection, fields } = this.props

    // get all editable/insertable fields (depending on current form type)
    let relevantFields = (
      this.getFormType() === 'edit'
      ? collection.getEditableFields(this.props.currentUser, this.getDocument())
      : collection.getInsertableFields(this.props.currentUser)
    )

    // if "fields" prop is specified, restrict list of fields to it
    if (typeof fields !== 'undefined' && fields.length > 0) {
      relevantFields = _.intersection(relevantFields, fields)
    }

    return relevantFields
  }


  // --------------------------------------------------------------------- //
  // ------------------------------- Errors ------------------------------ //
  // --------------------------------------------------------------------- //

  // clear all errors
  clearErrors() {
    this.setState({
      errors: [],
    })
  }

  // render errors
  renderErrors() {
    // FIXME: Flash = Telescope.components.Flash;
    const flashes = this.state.errors.map(message => (
      <div key={message} className='flash'>{message}</div>
    ))
    return <div className='form-errors'>{flashes}</div>
  }

  // --------------------------------------------------------------------- //
  // ------------------------------- Context ----------------------------- //
  // --------------------------------------------------------------------- //

  // add error to state
  throwError(error) {
    this.setState({
      errors: [error],
    })
  }

  // add something to prefilled values
  addToAutofilledValues(property) {
    this.setState({
      autofilledValues: { ...this.state.autofilledValues, ...property },
    })
  }

  // clear value
  clearValue(property) {
  }

  // pass on context to all child components
  getChildContext() {
    return {
      throwError: this.throwError,
      autofilledValues: this.state.autofilledValues,
      addToAutofilledValues: this.addToAutofilledValues,
      updateCurrentValue: this.updateCurrentValue,
    }
  }

  // manually update current value (i.e. on blur). See above for on change instead
  updateCurrentValue(fieldName, fieldValue) {
    const currentValues = this.state.currentValues
    currentValues[fieldName] = fieldValue
    this.setState({ currentValues })
  }

  // for each field, we apply the following logic:
  // - if its value is currently being inputted, use that
  // - else if its value was provided by the db, use that (i.e. props.document)
  // - else if its value is provded by the autofilledValues object, use that
  getDocument() {
    const currentDocument = _.clone(this.props.document) || {}
    const document = Object.assign(
      _.clone(this.state.autofilledValues), currentDocument,
      _.clone(this.state.currentValues)
    )
    return document
  }
  // --------------------------------------------------------------------- //
  // ------------------------------- Method ------------------------------ //
  // --------------------------------------------------------------------- //

  // common callback for both new and edit forms
  methodCallback(error, document) {
    this.setState({ disabled: false })

    if (error) { // error
      // add error to state
      this.throwError({
        content: error.message,
        type: 'error',
      })

      // run error callback if it exists
      if (this.props.errorCallback) this.props.errorCallback(document, error)
    } else { // success
      this.clearErrors()

      // reset form if this is a new document form
      if (this.getFormType() === 'new') this._form.reset()

      // run success callback if it exists
      if (this.props.successCallback) this.props.successCallback(document)

      // run close callback if it exists in context (i.e. we're inside a modal)
      if (this.context.closeCallback) this.context.closeCallback()
    }
  }

  // submit form handler
  submitForm(data) {
    this.setState({ disabled: true })

    const fields = this.getFieldNames()

    // if there's a submit callback, run it
    if (this.props.submitCallback) this.props.submitCallback()

    if (this.getFormType() === 'new') { // new document form
      // remove any empty properties
      let document = _.compactObject(Utils.flatten(data))

      // add prefilled properties
      if (this.props.prefilledProps) {
        document = Object.assign(document, this.props.prefilledProps)
      }

      // call method with new document
      //FIXME Meteor.call(this.props.methodName, document, this.methodCallback)
    } else { // edit document form
      const document = this.getDocument()

      // put all keys with data on $set
      const set = _.compactObject(Utils.flatten(data))

      // put all keys without data on $unset
      const unsetKeys = _.difference(fields, _.keys(set))
      const unset = _.object(unsetKeys, unsetKeys.map(() => true))

      // build modifier
      const modifier = { $set: set }
      if (!_.isEmpty(unset)) modifier.$unset = unset
      // call method with _id of document being edited and modifier
      //FIXME Meteor.call(this.props.methodName, document._id, modifier, this.methodCallback)
    }
  }

  buildFieldStub() {
    return {
      control: 'textarea',
      datatype: String,
      label: 'Body',
      layout: 'elementOnly',
      name: 'body',
      value: '',
    }
  }

  buildField(fieldName) {
    // get schema for the current field
    const fieldSchema = this.props.collection.simpleSchema()._schema[fieldName]
    fieldSchema.name = fieldName

    // add name, label, and type properties
    const label = (_.isFunction(this.props.labelFunction)
      ? this.props.labelFunction(fieldName)
      : fieldName)

    const field = {
      label,
      name: fieldName,
      datatype: fieldSchema.type,
      control: fieldSchema.control,
      layout: this.props.layout,
    }

    // add value
    field.value = (this.getDocument() && Utils.deepValue(this.getDocument(), fieldName)) || ''

    // replace value by prefilled value if value is empty
    if (fieldSchema.autoform && fieldSchema.autoform.prefill) {
      const prefilledValue = _.result(fieldSchema.autoform, 'prefill')
      if (!!prefilledValue && !field.value) {
        field.prefilledValue = prefilledValue
        field.value = prefilledValue
      }
    }

    // add options if they exist
    if (fieldSchema.autoform && fieldSchema.autoform.options) {
      field.options = _.result(fieldSchema.autoform, 'options')
    }

    if (fieldSchema.autoform && fieldSchema.autoform.disabled) {
      field.disabled = _.result(fieldSchema.autoform, 'disabled')
    }

    if (fieldSchema.autoform && fieldSchema.autoform.help) {
      field.help = _.result(fieldSchema.autoform, 'help')
    }

    return field
  }

  // --------------------------------------------------------------------- //
  // ------------------------------- Render ------------------------------ //
  // --------------------------------------------------------------------- //

  render() {
    // build fields array by iterating over the list of field names
    let fields = this.getFieldNames().map(fieldName => this.buildFieldStub(fieldName))
    // console.log(fields)

    // remove fields where control = "none"
    fields = _.reject(fields, field => field.control === 'none')

    return (
      <div className={`document-${this.getFormType()}`}>
        <Formsy.Form
          onSubmit={this.submitForm}
          disabled={this.state.disabled}
        >
          {this.renderErrors()}
          {fields.map(field =>
            <FormComponent
              key={field.name}
              updateCurrentValue={this.updateCurrentValue}
              {...field}
            />
          )}
          <Button type='submit' bsStyle='primary'>Submit</Button>
          {this.props.cancelCallback
            ? <a className='form-cancel' onClick={this.props.cancelCallback}>Cancel</a>
            : null
          }
        </Formsy.Form>
      </div>
    )
  }
}

NovaForm.propTypes = {
  collection: PropTypes.object.isRequired,
  document: PropTypes.object, // if a document is passed, this will be an edit form
  currentUser: PropTypes.object,
  submitCallback: PropTypes.func,
  successCallback: PropTypes.func,
  errorCallback: PropTypes.func,
  methodName: PropTypes.string,
  labelFunction: PropTypes.func,
  prefilledProps: PropTypes.object,
  layout: PropTypes.string,
  cancelCallback: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.string),
}

NovaForm.defaultPropTypes = {
  layout: 'horizontal',
}

NovaForm.contextTypes = {
  closeCallback: PropTypes.func,
}

NovaForm.childContextTypes = {
  autofilledValues: PropTypes.object,
  addToAutofilledValues: PropTypes.func,
  updateCurrentValue: PropTypes.func,
  throwError: PropTypes.func,
}

module.exports = NovaForm
export default NovaForm
