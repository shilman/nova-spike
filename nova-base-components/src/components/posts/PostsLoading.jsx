import React from 'react'
import Telescope from 'nova-core'

const PostsLoading = () => (
  <div className='posts-load-more-loading'>
    <Telescope.components.Loading />
  </div>
)

PostsLoading.displayName = 'PostsLoading'

export default PostsLoading
