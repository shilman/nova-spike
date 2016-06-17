import React from 'react'

let _x = null
const XFormComponent = () => (
  <div className='xform-component'>
    <div ref={(c) => _x = c}>xcomp</div>
  </div>
)

export default XFormComponent
