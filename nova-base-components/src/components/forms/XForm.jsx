import React from 'react'
import XFormComponent from './XFormComponent'

let _x = null
const XForm = () => (
  <div className='xform'>
    <div ref={(c) => _x = c}>testing</div>
    <XFormComponent />
    <XFormComponent />
    <XFormComponent />
  </div>
)

export default XForm
