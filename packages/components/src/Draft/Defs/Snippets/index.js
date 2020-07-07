import React from 'react'
import logoPathString from './logo-path'

const Snippets = (props) => {
  const fill = { fill: 'currentColor', stroke: 'none' }
  const stroke = { fill: 'none', stroke: 'currentColor' }
  return [
    <g id="notch" className="snippet notch" key="notch">
      <circle cy="0" cx="0" r="1.4" {...fill} />
      <circle cy="0" cx="0" r="2.8" {...stroke} />
    </g>,
    <g id="bnotch" className="snippet bnotch" key="bnotch">
      <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" {...stroke} />
      <circle cy="0" cx="0" r="2.8" {...stroke} />
    </g>,
    <g id="button" className="snippet button" key="button">
      <circle cx="0" cy="0" r="3.4" {...stroke} /> />
      <circle cx="-1" cy="-1" r="0.5" {...fill} />
      <circle cx="1" cy="-1" r="0.5" {...fill} />
      <circle cx="1" cy="1" r="0.5" {...fill} />
      <circle cx="-1" cy="1" r="0.5" {...fill} />
    </g>,
    <g id="buttonhole" className="snippet buttonhole" key="buttonhole">
      <path d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" {...stroke} />
      <path d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z" {...fill} />
    </g>,
    <radialGradient key="grad" id="snap-stud-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="30%" style={{ stopColor: 'rgb(235,235,235)', stopOpacity: 1 }} />
      <stop offset="80%" style={{ stopColor: 'rgb(100,100,100)', stopOpacity: 1 }} />
    </radialGradient>,
    <g id="snap-stud" key="snapstud">
      <circle cx="0" cy="0" r="3.4" style={{ stroke: '#666', fill: '#dddddd', strokeWidth: 0.3 }} />
      <circle cx="0" cy="0" r="1.8" style={{ stroke: 'none', fill: 'url(#snap-stud-grad)' }} />
      <path
        style={{ fill: 'none', stroke: '#666', strokeWidth: 0.2 }}
        d="M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1"
      />
    </g>,
    <g id="snap-socket" key="snapsocket">
      <circle cx="0" cy="0" r="3.4" style={{ stroke: '#666', fill: '#bbbbbb', strokeWidth: 0.3 }} />
      <circle cx="0" cy="0" r="2" style={{ stroke: '#666', fill: '#dddddd', strokeWidth: 0.4 }} />
      <path
        style={{ fill: 'none', stroke: '#666', strokeWidth: 0.5 }}
        d="M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1"
      />
    </g>,
    <g id="logo" className="snippet logo" transform="translate(-23 -36)" key="logo">
      <path d={logoPathString} {...fill} />
    </g>
  ]
}

export default Snippets
