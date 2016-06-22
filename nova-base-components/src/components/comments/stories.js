import React from 'react'
import { storiesWithContext, storiesOf, action } from '../../stories/helpers.js'
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

Factory.define('CommentsItem-default').attrs({
  comment: () => Factory.build('comment'),
  currentUser: () => Factory.build('user2'),
  replyCallback: () => action('reply'),
  editCallback: () => action('edit'),
  deleteCallback: () => action('delete'),
})

Factory.define('CommentsItem-deleted')
  .extend('CommentsItem-default')
  .attrs({ comment: () => Factory.build('comment', { isDeleted: true }) })

Factory.define('CommentsItem-owner')
  .extend('CommentsItem-default')
  .attrs({ currentUser: () => Factory.build('user') })

Factory.define('CommentsItem-editing')
  .extend('CommentsItem-default')
  .attrs({ showEdit: true })

Factory.define('CommentsItem-replying')
  .extend('CommentsItem-default')
  .attrs({ showReply: true })

storiesOf('CommentsItem', module)
  .addStoriesGroup(CommentsItem, Factory.buildStoriesWithPrefix('CommentsItem-', ))

// storiesOf('CommentsItem', module)
//   .add('default view', () => {
//     return <CommentsItem {...Factory.build('CommentsItem-default', itemCallbacks)} />
//   })
//   .add('deleted', () => {
//     return <CommentsItem {...Factory.build('CommentsItem-deleted', itemCallbacks)} />
//   })
//   .add('comment owner', () => {
//     return <CommentsItem {...Factory.build('CommentsItem-owner', itemCallbacks)} />
//   })
//   .add('editing', () => {
//     return <CommentsItem {...Factory.build('CommentsItem-editing', itemCallbacks)} />
//   })
//   .add('replying', () => {
//     return <CommentsItem {...Factory.build('CommentsItem-replying', itemCallbacks)} />
//   })

Factory.define('CommentsEdit-default').attrs({
  comment: () => Factory.build('comment'),
  successCallback: action('success'),
  cancelCallback: action('cancel'),
})

const context = { currentUser: Factory.build('user') }
storiesWithContext('CommentsItem', module, context)
  .addStoriesGroup(CommentsItem, Factory.buildStoriesWithPrefix('CommentsItem-', ))

Factory.define('CommentsNew-default')
  .attrs({
    parentComment: () => Factory.build('comment'),
    successCallback: () => action('success'),
    cancelCallback: () => action('cancel'),
    type: 'reply',
  })
  .attr('postId', ['parentComment'], (comment) => comment.postId)

storiesOf('CommentsNew', module)
  .addStoriesGroup(CommentsNew, Factory.buildStoriesWithPrefix('CommentsNew-', ))

Factory.define('CommentsList-default').attrs({
  results: () => [Factory.build('comment'), Factory.build('comment1')],
  currentUser: () => Factory.build('user2'),
  hasMore: false,
  ready: true,
  count: 2,
  totalCount: 2,
  loadMore: () => action('load more'),
})

Factory.define('CommentsList-has-more')
  .extend('CommentsList-default')
  .attrs({ hasMore: true, totalCount: 4 })

Factory.define('CommentsList-loading-more')
  .extend('CommentsList-has-more')
  .attrs({ ready: false })

Factory.define('CommentsList-empty')
  .extend('CommentsList-default')
  .attrs({ results: [], count: 0, totalCount: 0 })

Factory.define('CommentsList-loading')
  .extend('CommentsList-empty')
  .attrs({ ready: false })

storiesOf('CommentsList', module)
  .addStoriesGroup(CommentsList, Factory.buildStoriesWithPrefix('CommentsList-', ))


Factory.define('CommentsNode-default')
  .extend('CommentsItem-default')

Factory.define('CommentsNode-nested')
  .extend('CommentsNode-default')
  .attrs({ comment: Factory.build('comment-with-children') })

storiesOf('CommentsNode', module)
  .addStoriesGroup(CommentsNode, Factory.buildStoriesWithPrefix('CommentsNode-', ))



// FIXME: temporary
storiesOf('NovaForm', module)
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
