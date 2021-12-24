import React from 'react'

const Develop = (props) => {
  // Methods
  const renderAttributes = (attr) => {
    let list = []
    for (let a in attr.list)
      list.push(
        <li key={a}>
          <b>{a}</b>: {renderAttributeValue(attr.list[a])}
        </li>
      )

    return list
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

  const round = (val) => Math.round(val * 10) / 10

  if (!props.develop || props.focus === null || Object.keys(props.focus).length < 1) return null
  let info = []
  for (let part of Object.keys(props.focus)) {
    let points = []
    let paths = []
    for (let i in props.focus[part].paths) {
      let name = props.focus[part].paths[i]
      let path = props.parts[part].paths[name]
      paths.push(
        <details key={'patitle-' + name} className={'path c' + (i % 8)}>
          <summary>
            <span>path.<b>{name}</b></span>
            <button
              className="px-2 py-1 rounded text-secondary border-secondary border text-sm ml-4"
              onClick={() => console.log(`parts.${part}.paths.${name}:`, path)}
            >
              console.log
            </button>
          </summary>
          {path.attributes.length > 0 && (
            <ul key={'ops-' + name}>
              <li>
                <b>attributes</b>: {renderAttributes(path.attributes)}
              </li>
            </ul>
          )}
        </details>
      )
    }
    for (let i in props.focus[part].points) {
      let name = props.focus[part].points[i]
      let point = props.parts[part].points[name]
      points.push(
        <details key={'potitle-' + name} className={'point c' + (i % 8)}>
          <summary>
          <span>point.<b>{name}</b></span>
          <button
            className="px-2 py-1 rounded text-secondary border-secondary border text-sm hover:bold ml-4"
            onClick={() => console.log(`parts.${part}.points.${name}:`, point)}
          >
            console.log
          </button>
          </summary>
          <ul key={'pdata-' + name} className="text-sm">
            <li>
              <b>x</b>: {round(point.x)}
            </li>
            <li>
              <b>y</b>: {round(point.y)}
            </li>
            {point.attributes.length > 0 && (
              <li>
                <b>attributes</b>: {renderAttributes(point.attributes)}
              </li>
            )}
          </ul>
        </details>
      )
    }
    info.push(
      <details key={'part-' + part} open>
        <summary className="flex flex-row justify-between py-2 mr-2">
        <span>parts.<b>{part}</b></span>
        <button
          className="px-2 rounded text-secondary border-secondary border text-sm"
          onClick={() => props.raiseEvent('part', part)}
        >
          isolate
        </button>
        </summary>
        {points.length > 0 && <ul>{points}</ul>}
        {paths.length > 0 && <ul>{paths}</ul>}
      </details>
    )
  }

  return <div className="develop">{info}</div>
}

export default Develop
