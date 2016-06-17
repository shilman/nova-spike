import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import NovaForm from './NovaForm.jsx'
import Comments from 'nova-comments'
import Factory from '../../factories'

storiesOf('NovaForm CallbackRefs', module)
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
