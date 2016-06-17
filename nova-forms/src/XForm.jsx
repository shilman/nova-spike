import React from 'react'
import XFormComponent from './XFormComponent'

const XForm = () => (
  <div className='xform'>
    <div ref='ref'>testing</div>
    <XFormComponent />
    <XFormComponent />
    <XFormComponent />
  </div>
)

export default XForm
