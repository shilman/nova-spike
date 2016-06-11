import React, { PropTypes, Component } from 'react'
import Comments from 'nova-comments'
import NovaForm from 'nova-forms'

class CommentsEdit extends Component {
  render() {
    return (
      <div className='comments-edit-form'>
        <NovaForm
          collection={Comments}
          document={this.props.comment}
          currentUser={this.context.currentUser}
          methodName='comments.edit'
          successCallback={this.props.successCallback}
          layout='elementOnly'
          cancelCallback={this.props.cancelCallback}
        />
      </div>
    )
  }
}

CommentsEdit.propTypes = {
  comment: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
}

CommentsEdit.contextTypes = {
  currentUser: PropTypes.object,
}

module.exports = CommentsEdit
