import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Factory from '../../factories'
import '../components.js'
import CommentsItem from './CommentsItem.jsx'

const callbacks = {
  replyCallback: action('reply'),
  editCallback: action('edit'),
  deleteCallback: action('delete'),
}

storiesOf('CommentsItem', module)
  .add('default view', () => {
    return <CommentsItem {...Factory.build('comments-item-props', callbacks)} />
  })
  .add('deleted', () => {
    return <CommentsItem {...Factory.build('comments-item-deleted-props', callbacks)} />
  })
  .add('comment owner', () => {
    return <CommentsItem {...Factory.build('comments-item-owner-props', callbacks)} />
  })
  .add('editing', () => {
    return <CommentsItem {...Factory.build('comments-item-editing', callbacks)} />
  })
  .add('replying', () => {
    return <CommentsItem {...Factory.build('comments-item-replying', callbacks)} />
  })
