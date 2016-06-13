import React, { PropTypes } from 'react'
import { Posts } from 'nova-comments'

const PostsThumbnail = ({ post }) => {
  return (
    <a className='posts-thumbnail' href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
      <span><img src={Posts.getThumbnailUrl(post)} /></span>
    </a>
  )
}

PostsThumbnail.displayName = 'PostsThumbnail'
PostsThumbnail.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostsThumbnail
