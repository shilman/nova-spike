import { Factory } from 'rosie'
import { _ } from 'underscore'

Factory.buildStoriesWithPrefix = (prefix, extraProps={}) => (
  _.chain(Factory.factories)
    .pairs()
    .filter((pair) => pair[0].startsWith(prefix))
    .map((pair) => ({ name: pair[0].replace(prefix, ''), props: pair[1].build(extraProps) }))
    .value()
)

Factory.define('user').attrs({
  _id: '0',
  username: 'user',
})

Factory.define('user1')
  .extend('user')
  .attrs({ _id: '1', username: 'user1' })

Factory.define('user2')
  .extend('user')
  .attrs({ _id: '2', username: 'user2' })

Factory.define('comment').attrs({
  _id: '0',
  postId: '1',
  userId: '0', // FIXME: chained from user()
  body: 'commentBody',
  htmlBody: 'commentHtmlBody',
  childrenResults: null,
  user: () => Factory.build('user'),
})

Factory.define('comment1')
  .extend('comment')
  .attrs({
    _id: '1',
    body: 'commentBody1',
    htmlBody: 'commentHtmlBody1',
    user: () => Factory.build('user1'),
  })

Factory.define('comment2')
  .extend('comment')
  .attrs({
    _id: '2',
    body: 'commentBody2',
    htmlBody: 'commentHtmlBody2',
    user: () => Factory.build('user2'),
  })

Factory.define('comment-with-children')
  .extend('comment')
  .attrs({
    childrenResults: () => [
      Factory.build('comment1'),
      Factory.build('comment2'),
    ],
  })

Factory.define('message').attrs({
  content: 'message content',
})

Factory.define('error-message')
  .extend('message')
  .attrs({ type: 'error' })

Factory.define('post').attrs({
  _id: '0',
  score: 10,
  baseScore: 0,
  title: 'postTitle',
  url: 'http://telescopeapp.org',
  thumbnailUrl: '/telescope.png',
  user: () => Factory.build('user'),
  upvoters: [],
  downvoters: [],
  categoriesArray: () => [Factory.build('category'), Factory.build('category1')],
  commentersArray: () => [Factory.build('user'), Factory.build('user1')],
  commentCount: 3,
  upvotes: 0,
  clickCount: 10,
  viewCount: 100,
})

Factory.define('post-no-score')
  .extend('post')
  .attrs({
    score: 0,
  })

Factory.define('route').attrs({
  route: { name: 'routeName' },
  queryParams: { cat: 'cat-slug' },
})

Factory.define('category')
  .attrs({
    _id: '0',
    name: 'categoryName',
    slug: 'category-slug',
  })

Factory.define('category1')
  .extend('category')
  .attrs({ _id: '1', name: 'categoryName1' })

Factory.define('context-default').attrs({
  currentUser: () => Factory.build('user'),
  currentRoute: () => Factory.build('route'),
})

export default Factory
