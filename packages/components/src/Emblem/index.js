import React from 'react'

const Emblem = (props) => (
  <React.Fragment>
    <span className="emb">{props.t1 || 'Free'}</span>
    <span className="lem">{props.t2 || 'Sewing'}</span>
  </React.Fragment>
)

export default Emblem
