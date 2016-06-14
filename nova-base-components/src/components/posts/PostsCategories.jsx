import React, { PropTypes } from 'react'
import Router from '../router.js'

const PostsCategories = ({ post }) => {
  return (
    <div className='posts-categories'>
      {post.categoriesArray.map(category => (
        <a className='posts-category' key={category._id} href={Router.path('posts.list', {}, { cat: category.slug })}>
          {category.name}
        </a>
      ))}
    </div>
  )
}

PostsCategories.displayName = 'PostsCategories'
PostsCategories.propTypes = {
  post: PropTypes.object.isRequired,
}

module.exports = PostsCategories;
export default PostsCategories;