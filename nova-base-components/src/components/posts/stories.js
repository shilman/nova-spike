import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import WithContext from 'react-with-context'

import Factory from '../../factories'
import '../components.js'

import PostsLoadMore from './PostsLoadMore.jsx'
import PostsNoMore from './PostsNoMore.jsx'
import PostsNoResults from './PostsNoResults.jsx'
import PostsThumbnail from './PostsThumbnail.jsx'
import PostsLoading from './PostsLoading.jsx'
import PostsViews from './PostsViews.jsx'
import PostsCategories from './PostsCategories.jsx'
import PostsCommenters from './PostsCommenters.jsx'
import PostsStats from './PostsStats.jsx'
import PostsItem from './PostsItem.jsx'

storiesOf('PostsLoadMore', module)
  .add('default', () => {
    return (
      <PostsLoadMore
        loadMore={action('loadMore')}
        count={10}
        totalCount={15}
      />
    )
  })

storiesOf('PostsNoMore', module)
  .add('default', () => <PostsNoMore />)

storiesOf('PostsNoResults', module)
  .add('default', () => <PostsNoResults />)

storiesOf('PostsThumbnail', module)
  .add('default', () => <PostsThumbnail post={Factory.build('post')} />)

storiesOf('PostsLoading', module)
  .add('default', () => <PostsLoading />)

storiesOf('PostsViews', module)
  .addDecorator((story) => {
    const context = {
      currentUser: Factory.build('user'),
      currentRoute: Factory.build('route'),
    }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default', () => <PostsViews post={Factory.build('post')} />)

storiesOf('PostsCategories', module)
  .add('default', () => <PostsCategories post={Factory.build('post')} />)

storiesOf('PostsCommenters', module)
  .add('default', () => <PostsCommenters post={Factory.build('post')} />)

storiesOf('PostsStats', module)
  .add('default', () => <PostsStats post={Factory.build('post')} />)
  .add('no score', () => <PostsStats post={Factory.build('post-no-score')} />)

storiesOf('PostsItem', module)
  .addDecorator((story) => {
    const context = { currentUser: Factory.build('user') }
    return <WithContext context={context}>{story()}</WithContext>
  })
  .add('default', () => <PostsItem post={Factory.build('post')} />)
