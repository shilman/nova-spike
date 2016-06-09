import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Factory from '../../data'
import UsersAvatar from './UsersAvatar.jsx'

storiesOf('UsersAvatar', module)
  .add('default view', () => (
    <UsersAvatar user={Factory.build('user-1')} />
  ))
