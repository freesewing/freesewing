import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import IsolateIcon from '@material-ui/icons/Search'
import CameraIcon from '@material-ui/icons/CameraAlt'

const Design = (props) => {
  // Methods
  const renderAttributes = (attr) => {
    let list = []
    for (let a in attr.list)
      list.push(
        <li key={a}>
          <b>{a}</b>: {renderAttributeValue(attr.list[a])}
        </li>
      )

    return <ul>{list}</ul>
  }

  const renderAttributeValue = (val) => {
    if (Array.isArray(val)) {
      if (val.length === 1) return val.pop()
      let list = []
      for (let v of val) list.push(<li key={v}>{v}</li>)
      return <ul>{list}</ul>
    }

    return val
  }

  if (!props.design || props.focus === null || Object.keys(props.focus).length < 1) return null
  let info = []
  for (let part of Object.keys(props.focus)) {
    let points = []
    let paths = []
    for (let i in props.focus[part].paths) {
      let name = props.focus[part].paths[i]
      let path = props.parts[part].paths[name]
      paths.push(
        <li key={'patitle-' + name} className={'path c' + (i % 4)}>
          path.<b>{name}</b>
          <IconButton
            size="small"
            onClick={() => console.log(`parts.${part}.paths.${name}:`, path)}
          >
            <CameraIcon />
          </IconButton>
          {path.attributes.length > 0 && (
            <ul key={'ops-' + name}>
              <li>
                <b>attributes</b>: {renderAttributes(path.attributes)}
              </li>
            </ul>
          )}
        </li>
      )
    }
    for (let i in props.focus[part].points) {
      let name = props.focus[part].points[i]
      let point = props.parts[part].points[name]
      points.push(
        <li key={'potitle-' + name} className={'point c' + (i % 4)}>
          point.<b>{name}</b>
          <IconButton
            size="small"
            onClick={() => console.log(`parts.${part}.points.${name}:`, point)}
          >
            <CameraIcon />
          </IconButton>
          <ul key={'pdata-' + name}>
            <li>
              <b>x</b>: {point.x}
            </li>
            <li>
              <b>y</b>: {point.y}
            </li>
            {point.attributes.length > 0 && (
              <li>
                <b>attributes</b>: {renderAttributes(point.attributes)}
              </li>
            )}
          </ul>
        </li>
      )
    }
    info.push(
      <li key={'part-' + part}>
        parts.<b>{part}</b>
        <IconButton onClick={() => props.raiseEvent('part', part)}>
          <IsolateIcon />
        </IconButton>
        {points.length > 0 && <ul>{points}</ul>}
        {paths.length > 0 && <ul>{paths}</ul>}
      </li>
    )
  }

  return (
    <div className="design">
      <ul>{info}</ul>
    </div>
  )
}

export default Design
