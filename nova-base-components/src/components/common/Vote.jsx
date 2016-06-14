import React, { PropTypes, Component } from 'react'
import Telescope, { Messages } from 'nova-core'
import Users from 'nova-users'
import classNames from 'classnames'

class Vote extends Component {
  constructor() {
    super()
    this.upvote = this.upvote.bind(this)
  }

  // FIXME: voteCallback
  // else if () {
  //   Actions.call('posts.cancelUpvote', post._id, function () {
  //     Events.track('post upvote cancelled', { '_id': post._id })
  //   })
  // } else {
  //   Actions.call('posts.upvote', post._id, function () {
  //     Events.track('post upvoted', { '_id': post._id })
  //   })
  // }

  upvote(e) {
    e.preventDefault()

    const post = this.props.post
    const user = this.context.currentUser

    if (!user) {
      this.context.messageCallback('Please log in first')
    } else {
      this.props.voteCallback(post._id, !user.hasUpvoted(post))
    }
  }

  render() {
    const post = this.props.post
    const user = this.context.currentUser

    const hasUpvoted = Users.hasUpvoted(user, post)
    const hasDownvoted = Users.hasDownvoted(user, post)
    const actionsClass = classNames(
      'vote',
      { voted: hasUpvoted || hasDownvoted },
      { upvoted: hasUpvoted },
      { downvoted: hasDownvoted }
    )

    return (
      <div className={actionsClass}>
        <a className='upvote-button' onClick={this.upvote}>
          <Telescope.components.Icon name='upvote' />
          <div className='sr-only'>Upvote</div>
          <div className='vote-count'>{post.baseScore || 0}</div>
        </a>
      </div>
    )
  }
}

Vote.propTypes = {
  post: PropTypes.object.isRequired, // the current post
  voteCallback: PropTypes.func,
}

Vote.contextTypes = {
  currentUser: PropTypes.object,
  messageCallback: PropTypes.func,
}

module.exports = Vote
export default Vote
