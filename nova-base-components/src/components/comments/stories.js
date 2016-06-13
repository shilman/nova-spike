import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import WithContext from 'react-with-context'

// FIXME: should be part of forms package
import Comments from 'nova-comments'
import {NovaForm, FormComponent} from 'nova-forms'

import Factory from '../../factories'
import '../components.js'
import CommentsItem from './CommentsItem.jsx'
import CommentsEdit from './CommentsEdit.jsx'
import CommentsNew from './CommentsNew.jsx'

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

// FIXME: should be part of forms package
storiesOf('NovaForm', module)
  .add('comment edit', () => {
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

storiesOf('FormComponent', module)
  .add('text input', () => {
    const field = {
      control: "text",
      datatype: String,
      label: "Title",
      layout: undefined,
      name: "title",
      value: "testValue",
    }
    return (
      <FormComponent
        key={field.name}
        {...field}
        updateCurrentValue={action("update")}
      />
    )
  })
