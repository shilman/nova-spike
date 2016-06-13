const Comments = {
  getEditableFields: () => [],
  getInsertableFields: () => [],
}

export default Comments

// FIXME
const Categories = {
  getEditableFields: () => [],
  getInsertableFields: () => [],
}

// FIXME
const Posts = {
  getLink: (post) => post.url,
  getLinkTarget: (post) => '',
  getThumbnailUrl: (post) => post.thumbnailUrl,
  getPageUrl: (post) => post.url,
}

export { Categories, Comments, Posts }
