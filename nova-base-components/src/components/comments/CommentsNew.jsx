import React, { PropTypes, Component } from 'react'

import { Telescope } from 'nova-core'
import { NovaForm } from 'nova-forms'
import Comments from 'nova-comments'

class CommentsNew extends Component {

  render() {
    let prefilledProps = { postId: this.props.postId }

    if (this.props.parentComment) {
      const { parentComment } = this.props
      prefilledProps = Object.assign(prefilledProps, {
        parentCommentId: parentComment._id,
        // if parent comment has topLevelCommentId use it; if not then it *is* the top level comment
        topLevelCommentId: parentComment.topLevelCommentId || parentComment._id
      })
    }

    return (
      <div className='comments-new-form'>
        <NovaForm
          collection={Comments}
          currentUser={this.context.currentUser}
          methodName='comments.new'
          prefilledProps={prefilledProps}
          successCallback={this.props.successCallback}
          labelFunction={(fieldName) => Telescope.utils.getFieldLabel(fieldName, Comments)}
          layout='elementOnly'
          cancelCallback={this.props.type === 'reply' ? this.props.cancelCallback : null}
        />
      </div>
    )
  }

}

CommentsNew.propTypes = {
  postId: PropTypes.string.isRequired,
  type: PropTypes.string, // "comment" or "reply"
  parentComment: PropTypes.object, // if reply, the comment being replied to
  parentCommentId: PropTypes.string, // if reply
  topLevelCommentId: PropTypes.string, // if reply
  successCallback: PropTypes.func, // submission has succeeded
  cancelCallback: PropTypes.func,
}

CommentsNew.contextTypes = {
  currentUser: PropTypes.object,
}

module.exports = CommentsNew
