import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Factory from '../../factories'
import '../components.js'
import CommentsNew from './CommentsNew.jsx'

storiesOf('CommentsNew', module)
  .add('default view', () => {
    const comment = Factory.build('comment')
    return <CommentsNew
      postId={comment.postId}
      parentComment={comment}
      successCallback={() => null}
      cancelCallback={() => null}
      type="reply"
    />
  })
