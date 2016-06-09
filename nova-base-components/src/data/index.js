import { Factory } from 'rosie'
import { _ } from 'underscore'

// FIXME: waiting on https://github.com/rosiejs/rosie/pull/52
Factory.prototype._attrs = function(attributes) {
  for (var attr in attributes) {
    this.attr(attr, attributes[attr])
  }
  return this
}

Factory.define('user-1')._attrs({
  username: 'user-1',
})

Factory.define('user-2')._attrs({
  username: 'user-2',
})

Factory.define('comment')._attrs({
  body: 'commentBody',
  htmlBody: 'commentHtmlBody',
  user: () => Factory.build('user-1'),
})

Factory.define('comments-item-props')._attrs({
  comment: () => Factory.build('comment'),
  currentUser: () => Factory.build('user-2'),
})

Factory.define('comments-item-deleted-props')
  .extend('comments-item-props')
  .attr('comment', () => Factory.build('comment', {isDeleted: true}))


export default Factory
