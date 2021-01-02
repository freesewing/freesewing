import React, { useState } from 'react'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'

const OptionSubGroup = ({ title, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <li>
      <span className="subheading" onClick={() => setOpen(!open)}>
        <RightIcon className={`icon-col-exp ${open ? 'expanded' : ''}`} />
        {title}
      </span>
      {open && <ul className="config level-3">{children}</ul>}
    </li>
  )
}

export default OptionSubGroup
