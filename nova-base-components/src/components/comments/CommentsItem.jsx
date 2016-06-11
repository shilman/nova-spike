import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import Telescope, { Messages } from 'nova-core'
import Users from 'nova-users'

import Actions from '../actions.js'

class CommentsItem extends Component {
  renderComment() {
    const htmlBody = { __html: this.props.comment.htmlBody }
    return (
      <div className='comments-item-text'>
        <div dangerouslySetInnerHTML={htmlBody}></div>
        {!this.props.comment.isDeleted
          ? <a className='comments-item-reply-link' onClick={() => this.props.replyCallback(true)}>
              <Telescope.components.Icon name='reply' /> Reply
            </a>
          : null}
      </div>
    )
  }

  renderReply() {
    return (
      <div className='comments-item-reply'>
        <Telescope.components.CommentsNew
          postId={this.props.comment.postId}
          parentComment={this.props.comment}
          successCallback={() => this.props.replyCallback(true)}
          cancelCallback={() => this.props.replyCallback(false)}
          type='reply'
        />
      </div>
    )
  }

  renderEdit() {
    return (
      <Telescope.components.CommentsEdit
        comment={this.props.comment}
        successCallback={this.editSuccessCallback}
        cancelCallback={this.editCancelCallback}
      />
    )
  }

  render() {
    const comment = this.props.comment
    return (
      <div className='comments-item' id={comment._id}>
        <div className='comments-item-body'>
          <div className='comments-item-meta'>
            <Telescope.components.UsersAvatar size='small' user={comment.user} />
            <Telescope.components.UsersName user={comment.user} />
            <div className='comments-item-date'>{moment(comment.postedAt).fromNow()}</div>
            {Users.can.edit(this.props.currentUser, this.props.comment)
              ? <a className='comment-edit' onClick={this.props.editCallback}>Edit</a>
              : null}
            {Users.can.edit(this.props.currentUser, this.props.comment)
              ? <a className='comment-delete' onClick={this.props.deleteCallback}>Delete</a>
              : null}
          </div>
          {this.props.showEdit ? this.renderEdit() : this.renderComment()}
        </div>
        {this.props.showReply ? this.renderReply() : null}
      </div>
    )
  }

}

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired, // the current comment
  currentUser: PropTypes.object, // the current user
  replyCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  showReply: PropTypes.bool,
  showEdit: PropTypes.bool,
}

module.exports = CommentsItem
