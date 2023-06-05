// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { FilterIcon, WrenchIcon, ClearIcon, HelpIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
// Dependencies
import { utils } from 'pkgs/react-components/src/index.mjs'
const { getId } = utils
import orderBy from 'lodash.orderby'
import { stackInfo } from './stack.mjs'
import { pathInfo } from './path.mjs'
import { pointInfo } from './point.mjs'

export const ns = ['inspector']

const getPatternObjects = (renderProps) => {
  const all = {
    points: {},
    paths: {},
    stacks: {},
  }
  for (const [stackName, stack] of Object.entries(renderProps.stacks)) {
    all.stacks[getId({ stackName, settings: { idPrefix: 'stack-' } })] = {
      stack: stackName,
      id: getId({ stackName }),
      label: `${stackName} stack`,
    }
    for (const part of stack.parts) {
      for (const pathName in part.paths)
        all.paths[getId({ pathName, stackName, settings: { idPrefix: 'path-' } })] = {
          stack: stackName,
          path: pathName,
          id: getId({ pathName, stackName }),
          label: `[${stackName}] ${pathName}`,
        }
      for (const pointName in part.points)
        all.points[getId({ pointName, stackName, settings: { idPrefix: 'point-' } })] = {
          stack: stackName,
          point: pointName,
          id: getId({ pointName, stackName }),
          label: `[${stackName}] ${pointName}`,
        }
    }
  }

  return all
}

const StackFinder = ({ renderProps, inspector, t }) => {
  const all = getPatternObjects(renderProps)

  const findStack = (evt) => {
    const id = getId({ stackName: evt.target.value, settings: { idPrefix: 'stack-' } })
    inspector.show(
      stackInfo({
        stackName: evt.target.value,
        stack: renderProps.stacks[evt.target.value],
        inspector,
        id,
        t,
      })
    )
    inspector.reveal(id)
  }

  const findPath = (evt) => {
    const path = JSON.parse(evt.target.value)
    const id = getId({
      stackName: path.stack,
      pathName: path.path,
      settings: { idPrefix: 'path-' },
    })
    inspector.show(
      pathInfo({
        stackName: path.stack,
        pathName: path.path,
        path: renderProps.stacks[path.stack].parts[0].paths[path.path],
        inspector,
        id,
        t,
      })
    )
    inspector.reveal(id)
  }

  const findPoint = (evt) => {
    const point = JSON.parse(evt.target.value)
    const id = getId({
      stackName: point.stack,
      pointName: point.point,
      settings: { idPrefix: 'point-' },
    })
    inspector.show(
      pointInfo({
        stackName: point.stack,
        pointName: point.point,
        point: renderProps.stacks[point.stack].parts[0].points[point.point],
        inspector,
        id,
        t,
      })
    )
    inspector.reveal(id)
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-center mb-4">
        <select className="select select-bordered w-full" onChange={findStack}>
          <option disabled selected>
            Stacks
          </option>
          {orderBy(all.stacks, ['label'], ['asc']).map((stack) => (
            <option key={stack.id} value={stack.stack}>
              {stack.label}
            </option>
          ))}
        </select>
        <select className="select select-bordered w-full" onChange={findPath}>
          <option disabled selected>
            Paths
          </option>
          {orderBy(all.paths, ['label'], ['asc']).map((path) => (
            <option key={path.id} value={JSON.stringify(path)}>
              {path.label}
            </option>
          ))}
        </select>
        <select className="select select-bordered w-full" onChange={findPoint}>
          <option disabled selected>
            Points
          </option>
          {orderBy(all.points, ['label'], ['asc']).map((point) => (
            <option key={point.id} value={JSON.stringify(point)}>
              {point.label}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export const Inspector = ({
  design,
  update,
  settings,
  patternConfig,
  language,
  DynamicDocs,
  control,
  ui,
  inspector,
  renderProps,
}) => {
  // FIXME: Update this namespace
  const { t } = useTranslation(ns)

  return (
    <>
      <div className="px-2">
        {control > 4 ? null : (
          <>
            <h5 className="flex flex-row gap-2 items-center">
              <WrenchIcon />
              <span>{t('inspector:inspector')}</span>
            </h5>
            <p>{t('inspector:inspector.d')}</p>
          </>
        )}
      </div>
      <StackFinder {...{ renderProps, inspector, t }} />
      {Object.values(inspector.data.show).map((props) => (
        <Collapse {...props} />
      ))}
      {control > 4 ? <div className="border-t border-solid border-base-300 mx-36"></div> : null}
    </>
  )
}
