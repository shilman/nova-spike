import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import WithContext from 'react-with-context'

import Factory from '../../factories'
import '../components.js'
import Category from './Category.jsx'
import CategoriesList from './CategoriesList.jsx'
import CategoriesNewForm from './CategoriesNewForm.jsx'
import CategoriesEditForm from './CategoriesEditForm.jsx'

const categoryCallbacks = {
  openModal: action('open-modal'),
}

storiesOf('Category', module)
  .add('default view', () => {
    return <Category {...Factory.build('category-props', categoryCallbacks)} />
  })

storiesOf('CategoriesList', module)
  .addDecorator((story) => {
    const context = {
      currentUser: Factory.build('user'),
      currentRoute: Factory.build('route'),
    }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default view', () => {
    return <CategoriesList {...Factory.build('categories-list-props', categoryCallbacks)} />
  })

storiesOf('CategoriesNewForm', module)
  .addDecorator((story) => {
    const context = { currentUser: Factory.build('user') }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default view', () => {
    return <CategoriesNewForm />
  })

storiesOf('CategoriesEditForm', module)
  .addDecorator((story) => {
    const context = { currentUser: Factory.build('user') }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default view', () => {
    return <CategoriesEditForm />
  })


//storiesOf('CategoriesEditForm', module)
