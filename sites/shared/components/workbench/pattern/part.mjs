// Dependencies
import { forwardRef } from 'react'
import { round } from 'shared/utils.mjs'
import { getProps } from './utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { Point } from './point.mjs'
import { Snippet } from './snippet.mjs'
import { Path, Tr, KeyTd, ValTd, Attributes, pointCoords } from './path.mjs'

const partInfo = ({ partName, part, settings, update }) => {
  const { t } = useTranslation(['workbench'])

  return (
    <div className="p-4 border bg-neutral bg-opacity-40 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">{t('partInfo')}</h5>
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>{t('name')})</KeyTd>
            <ValTd>{partName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>{t('width')}</KeyTd>
            <ValTd>{round(part.width, 2)}mm</ValTd>
          </Tr>
          <Tr>
            <KeyTd>{t('height')}</KeyTd>
            <ValTd>{round(part.height, 2)}mm</ValTd>
          </Tr>
          <Tr>
            <KeyTd>{t('topLeft')}</KeyTd>
            <ValTd>{pointCoords(part.topLeft)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>{t('bottomRight')}</KeyTd>
            <ValTd>{pointCoords(part.bottomRight)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>{t('attributes')}</KeyTd>
            <ValTd>
              <Attributes list={part.attributes.list} />
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {settings.only && settings.only.length > 0 ? (
          <button className="btn btn-primary" onClick={() => update.settings(['only'])}>
            {t('showAllParts')}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => update.settings(['only'], [partName])}>
            {t('showOnlyThisPart')}
          </button>
        )}
        <button className="btn btn-success" onClick={() => console.log(part)}>
          console.log(part)
        </button>
        <button className="btn btn-success" onClick={() => console.table(part.points)}>
          console.table(part.points)
        </button>
        <button className="btn btn-success" onClick={() => console.table(part.paths)}>
          console.table(part.paths)
        </button>
      </div>
    </div>
  )
}

const XrayPart = ({ partName, part, settings, showInfo, update }) => {
  const { topLeft, bottomRight } = part

  return (
    <g>
      <path
        d={`
        M ${topLeft.x} ${topLeft.y}
        L ${topLeft.x} ${bottomRight.y}
        L ${bottomRight.x} ${bottomRight.y}
        L ${bottomRight.x} ${topLeft.y}
        z
        `}
        className={`peer stroke-note lashed opacity-30 hover:opacity-90 fill-fabric hover:cursor-pointer hover:stroke-mark`}
        style={{ fillOpacity: 0 }}
        onClick={(evt) => showInfo(evt, partInfo({ partName, part, settings, update }))}
      />
    </g>
  )
}

export const PartInner = forwardRef(({ partName, part, settings, showInfo, ui, update }, ref) => {
  const Grid =
    settings.paperless && !ui.skipGrid ? (
      <rect
        x={part.topLeft.x}
        y={part.topLeft.y}
        width={part.width}
        height={part.height}
        className="grid"
        fill={'url(#grid-' + partName + ')'}
      />
    ) : null

  return (
    <g ref={ref}>
      {Grid}
      {ui.xray?.enabled && <XrayPart {...{ partName, part, settings, showInfo, update }} />}
      {Object.keys(part.paths).map((pathName) => (
        <Path
          key={pathName}
          pathName={pathName}
          path={part.paths[pathName]}
          topLeft={part.topLeft}
          bottomRight={part.bottomRight}
          units={settings.units}
          {...{ partName, part, showInfo, ui, update }}
        />
      ))}
      {Object.keys(part.points).map((pointName) => (
        <Point
          key={pointName}
          pointName={pointName}
          point={part.points[pointName]}
          topLeft={part.topLeft}
          bottomRight={part.bottomRight}
          {...{ partName, part, settings, showInfo, ui, update }}
        />
      ))}
      {Object.keys(part.snippets).map((snippetName) => (
        <Snippet
          key={snippetName}
          snippetName={snippetName}
          snippet={part.snippets[snippetName]}
          {...{ partName, part, settings, showInfo, ui, update }}
        />
      ))}
    </g>
  )
})

PartInner.displayName = 'PartInner'

export const Part = ({ partName, part, settings, showInfo, ui, update }) => (
  <g
    {...getProps(part)}
    id={`${part.context.settings.idPrefix || ''}part-${partName}`}
    className={part.context.settings.idPrefix || ''}
  >
    <PartInner {...{ partName, part, settings, showInfo, ui, update }} />
  </g>
)
