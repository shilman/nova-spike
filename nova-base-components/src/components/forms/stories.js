import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import { NovaForm, XForm } from 'nova-forms'
import Comments from 'nova-comments'
import Factory from '../../factories'

storiesOf('XForm', module)
  .add('default', () => {
    return (
      <XForm />
    )
  })

storiesOf('NovaForm', module)
  .add('comment edit test', () => {
    const comment = Factory.build('comment')
    const user = Factory.build('user')
    console.log('comment', comment);
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
