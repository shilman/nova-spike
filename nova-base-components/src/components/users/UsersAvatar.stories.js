import React from 'react'
import { storiesOf } from '@kadira/storybook'
import UsersAvatar from './UsersAvatar.jsx'

storiesOf('UsersAvatar', module)
  .add('default view', () => (
    <UsersAvatar user={{}} />
  ))
