import { Meteor } from 'nova-core'
import { action } from '@kadira/storybook'

import 'nova-base-styles/dist/main.scss'
import 'nova-base-styles/dist/bootstrap.css'

import '../components/users/UsersName.stories.js'
import '../components/users/UsersAvatar.stories.js'
import '../components/comments/stories.js'
import '../components/categories/stories.js'
import '../components/common/stories.js'
import '../components/posts/stories.js'


// FIXME: how do we unstub on teardown?
Meteor.call = (methodName, args) => action(methodName)(args)
