import React, { PropTypes, Component } from 'react'
import Router from '../router.js'

import { Messages } from 'nova-core'

import NovaForm from 'nova-forms'

const PostsNewForm = (props, context) => {

  return (
    <Telescope.components.CanCreatePost>
      <div className='posts-new-form'>
        <NovaForm
          collection={Posts}
          currentUser={context.currentUser}
          methodName='posts.new'
          successCallback={(post) => {
            Messages.flash('Post created.', 'success')
            Router.go('posts.single', post)
          }}
          labelFunction={(fieldName) => Telescope.utils.getFieldLabel(fieldName, Posts)}
        />
      </div>
    </Telescope.components.CanCreatePost>
  )
}

PostsNewForm.contextTypes = {
  currentUser: React.PropTypes.object,
}

PostsNewForm.displayName = 'PostsNewForm'

module.exports = PostsNewForm
export default PostsNewForm
