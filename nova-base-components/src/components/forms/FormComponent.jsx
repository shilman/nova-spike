import React, { PropTypes, Component } from 'react'
import Formsy from 'formsy-react'
import FRC from './formsy-components'

import DateTime from './DateTime'
import Utils from './utils.js'

const Checkbox = FRC.Checkbox
// const CheckboxGroup = FRC.CheckboxGroup;
const Input = FRC.Input
const RadioGroup = FRC.RadioGroup
const Select = FRC.Select
const Textarea = FRC.Textarea

class FormComponent extends Component {

  constructor(props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur() {
    const value = this.formControl && this.formControl.getValue()
    this.props.updateCurrentValue(this.props.name, value)
  }

  renderComponent() {
    const properties = {
      ...this.props,
      onBlur: this.handleBlur,
      ref: (c) => this.formControl = c,
    }

    // if control is a React component, use it
    if (typeof this.props.control === 'function') {
      return <this.props.control {...properties} />
    } else { // else pick a predefined component
      switch (this.props.control) {
        case 'text':
          return <Input {...properties} type='text' />
        case 'textarea':
          return <Textarea {...properties} />
        case 'checkbox':
          return <Checkbox {...properties} />
        // note: checkboxgroup cause React refs error
        case 'checkboxgroup':
          return <CheckboxGroup {...properties} />
        case 'radiogroup':
          return <RadioGroup {...properties} />
        case 'select':
          return <Select {...properties} />
        // case "datetime":
        //   return <DateTime      {...properties} />;
        default:
          return <Input {...properties} type='text' />
      }
    }
  }

  render() {
    return <div className={'input-' + this.props.name}>{this.renderComponent()}</div>
  }
}

FormComponent.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  prefilledValue: PropTypes.any,
  options: PropTypes.any,
  control: PropTypes.any,
  datatype: PropTypes.any,
  disabled: PropTypes.bool,
  updateCurrentValue: PropTypes.func,
}

export default FormComponent

// -------------------------------------//

// having the CheckboxGroup component in this file prevents a weird bug

import ComponentMixin from './component'
import Row from './row'

const CheckboxGroup = React.createClass({
  mixins: [Formsy.Mixin, ComponentMixin],

  propTypes: {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
  },

  getDefaultProps: function () {
    return {
      label: '',
      help: null,
    }
  },

  changeCheckbox: function () {
    var value = []
    this.props.options.forEach((option, key) => {
      if (this[`element-${key}`].checked) {
        value.push(option.value)
      }
    })
    this.setValue(value)
    this.props.onChange(this.props.name, value)
  },

  renderElement: function () {
    var _this = this
    var controls = this.props.options.map(function (checkbox, key) {
      var checked = (_this.getValue().indexOf(checkbox.value) !== -1)
      var disabled = _this.isFormDisabled() || checkbox.disabled || _this.props.disabled
      return (
        <div className='checkbox' key={key}>
          <label>
            <input
              ref={(c) => this[`element-${key}`] = c}
              checked={checked}
              type='checkbox'
              value={checkbox.value}
              onChange={_this.changeCheckbox}
              disabled={disabled}
            /> {checkbox.label}
          </label>
        </div>
      )
    })
    return controls
  },

  render: function () {
    if (this.getLayout() === 'elementOnly') {
      return (
        <div>{this.renderElement()}</div>
      )
    }

    return (
      <Row
        {...this.getRowProperties()}
        fakeLabel>
        {this.renderElement()}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    )
  },
})
