import { Meteor } from 'nova-core'
import { action } from '@kadira/storybook'

import '../stylesheets/main.scss'
import '../stylesheets/bootstrap.css'

import '../components/users/UsersName.stories.js'
import '../components/users/UsersAvatar.stories.js'
import '../components/comments/CommentsItem.stories.js'
import '../components/comments/CommentsNew.stories.js'

// FIXME: how do we unstub on teardown?
Meteor.call = (methodName, args) => action(methodName)(args)
