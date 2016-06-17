const BODY = {
  control: 'textarea',
  datatype: String,
  label: 'Body',
  layout: 'elementOnly',
  name: 'body',
  value: '',
}

const Comments = {
  getEditableFields: () => ['body'],
  getInsertableFields: () => ['body'],
}

export default Comments
