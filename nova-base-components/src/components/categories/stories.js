import React from 'react'
import { storiesWithContext, storiesOf, action } from '../../stories/helpers.js'
import Factory from '../../factories'

import '../components.js'
import Category from './Category.jsx'
import CategoriesList from './CategoriesList.jsx'
import CategoriesNewForm from './CategoriesNewForm.jsx'
import CategoriesEditForm from './CategoriesEditForm.jsx'

const context = Factory.build('context-default')

Factory.define('Category-default')
  .attrs({
    key: 0,
    category: () => Factory.build('category'),
    currentCategorySlug: 'category-slug', // FIXME: ??
    openModal: () => action('open-modal'),
  })

storiesOf('Category', module)
  .addStoriesGroup(Category, Factory.buildStoriesWithPrefix('Category-'))

Factory.define('CategoriesList-default')
  .attrs({
    categories: () => [Factory.build('category'), Factory.build('category1')],
    openModal: () => action('open-modal'),
  })

storiesWithContext('CategoriesList', module, context)
  .addStoriesGroup(CategoriesList, Factory.buildStoriesWithPrefix('CategoriesList-'))

storiesWithContext('CategoriesNewForm', module, context)
  .add('default', () => {
    return <CategoriesNewForm />
  })

Factory.define('CategoriesEditForm-default')
  .attrs({
    categories: () => [Factory.build('category'), Factory.build('category1')],
  })

storiesWithContext('CategoriesEditForm', module, context)
  .addStoriesGroup(CategoriesEditForm, Factory.buildStoriesWithPrefix('CategoriesEditForm-'))
