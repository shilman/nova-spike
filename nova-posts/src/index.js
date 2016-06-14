const Posts = {
  getEditableFields: () => [],
  getInsertableFields: () => [],
  getLink: (post) => post.url,
  getLinkTarget: (post) => '',
  getThumbnailUrl: (post) => post.thumbnailUrl,
  getPageUrl: (post) => post.url,
}

export default Posts
