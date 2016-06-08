import React from 'react'
import { storiesOf } from '@kadira/storybook'
import '../components.js'
import CommentsItem from './CommentsItem.jsx'

storiesOf('CommentsItem', module)
  .add('default view', () => {
    const comment = 'body'
    return <CommentsItem comment={comment} />
  })
