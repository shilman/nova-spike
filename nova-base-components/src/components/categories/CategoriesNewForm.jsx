import React, { PropTypes, Component } from 'react'

import { Messages } from 'nova-core'
import { Categories } from 'nova-comments' //FIXME: temp
import NovaForm from 'nova-forms'

const CategoriesNewForm = (props, context) => {
  return (
    <div className='categories-new-form'>
      <NovaForm
        collection={Categories}
        currentUser={context.currentUser}
        methodName='categories.new'
        successCallback={(category) => {
          Messages.flash('Category created.', 'success')
        }}
        labelFunction={(fieldName) => Telescope.utils.getFieldLabel(fieldName, Categories)}
      />
    </div>
  )
}

CategoriesNewForm.displayName = 'CategoriesNewForm'

CategoriesNewForm.contextTypes = {
  currentUser: PropTypes.object,
}

export default CategoriesNewForm
