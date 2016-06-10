import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Factory from '../../factories'
import UsersName from './UsersName.jsx'

storiesOf('UsersName', module)
  .add('default view', () => (
    <UsersName user={Factory.build('user')} />
  ))
