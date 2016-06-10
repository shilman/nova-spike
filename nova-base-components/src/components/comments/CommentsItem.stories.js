import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Factory from '../../factories'
import '../components.js'
import CommentsItem from './CommentsItem.jsx'

storiesOf('CommentsItem', module)
  .add('default view', () => {
    return <CommentsItem {...Factory.build('comments-item-props')} />
  })
  .add('deleted', () => {
    return <CommentsItem {...Factory.build('comments-item-deleted-props')} />
  })
  .add('comment owner', () => {
    return <CommentsItem {...Factory.build('comments-item-owner-props')} />
  })
