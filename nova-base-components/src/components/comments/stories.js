import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import WithContext from 'react-with-context'

import Factory from '../../factories'
import '../components.js'
import CommentsItem from './CommentsItem.jsx'
import CommentsEdit from './CommentsEdit.jsx'
import CommentsNew from './CommentsNew.jsx'
import CommentsList from './CommentsList.jsx'
import CommentsNode from './CommentsNode.jsx'

// FIXME: temporary
import NovaForm from 'nova-forms'
import Comments from 'nova-comments'

const itemCallbacks = {
  replyCallback: action('reply'),
  editCallback: action('edit'),
  deleteCallback: action('delete'),
}

storiesOf('CommentsItem', module)
  .add('default view', () => {
    return <CommentsItem {...Factory.build('comments-item-props', itemCallbacks)} />
  })
  .add('deleted', () => {
    return <CommentsItem {...Factory.build('comments-item-deleted-props', itemCallbacks)} />
  })
  .add('comment owner', () => {
    return <CommentsItem {...Factory.build('comments-item-owner-props', itemCallbacks)} />
  })
  .add('editing', () => {
    return <CommentsItem {...Factory.build('comments-item-editing', itemCallbacks)} />
  })
  .add('replying', () => {
    return <CommentsItem {...Factory.build('comments-item-replying', itemCallbacks)} />
  })

const editCallbacks = {
  successCallback: action('success'),
  cancelCallback: action('cancel'),
}

storiesOf('CommentsEdit', module)
  .addDecorator((story) => {
    const context = { currentUser: Factory.build('user') }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default view', () => {
    return <CommentsEdit {...Factory.build('comments-edit-props', editCallbacks)} />
  })

storiesOf('CommentsNew', module)
  .add('default view', () => {
    const comment = Factory.build('comment')
    return (
      <CommentsNew
        postId={comment.postId}
        parentComment={comment}
        successCallback={action('success')}
        cancelCallback={action('cancel')}
        type='reply'
      />
    )
  })

const loadCallbacks = {
  loadMore: action('load more'),
}

storiesOf('CommentsList', module)
  .add('default list', () => {
    return <CommentsList {...Factory.build('comments-list-default-props', loadCallbacks)} />
  })
  .add('has-more list', () => {
    return <CommentsList {...Factory.build('comments-list-has-more-props', loadCallbacks)} />
  })
  .add('loading more list', () => {
    return <CommentsList {...Factory.build('comments-list-loading-more-props', loadCallbacks)} />
  })
  .add('empty list', () => {
    return <CommentsList {...Factory.build('comments-list-empty-props', loadCallbacks)} />
  })
  .add('loading', () => {
    return <CommentsList {...Factory.build('comments-list-loading-props', loadCallbacks)} />
  })

storiesOf('CommentsNode', module)
  .add('single comment', () => {
    return <CommentsNode {...Factory.build('comments-node-props')} />
  })
  .add('nested comment', () => {
    return <CommentsNode {...Factory.build('comments-node-nested-props')} />
  })

// FIXME: temporary
storiesOf('NovaForm StringRefs', module)
  .add('comment edit test', () => {
    const comment = Factory.build('comment')
    const user = Factory.build('user')
    return (
      <NovaForm
        collection={Comments}
        document={comment}
        currentUser={user}
        methodName='comments.edit'
        successCallback={action('success')}
        layout='elementOnly'
        cancelCallback={action('cancel')}
      />
    )
  })
