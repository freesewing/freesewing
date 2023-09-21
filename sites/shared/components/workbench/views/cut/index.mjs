import { useEffect, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { CutMenu, ns as menuNs } from './menu.mjs'
import { MovablePattern } from 'shared/components/workbench/pattern/movable/index.mjs'
import { PatternWithMenu, ns as wrapperNs } from '../pattern-with-menu.mjs'
import { IconWrapper } from 'shared/components/icons.mjs'
import {
  activeMaterialPath,
  useMaterialSettings,
  useMaterialDraft,
  useMaterialList,
  useMaterialLength,
} from './hooks'
import { V3Wip } from 'shared/components/v3-wip.mjs'

export const ns = [...menuNs, ...wrapperNs]

const SheetIcon = (props) => (
  <IconWrapper {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
    />
  </IconWrapper>
)

const MaterialCounter = ({ settings, renderProps }) => {
  const materialLength = useMaterialLength(settings.units === 'imperial', renderProps.height)

  return (
    <div className="flex flex-row font-bold items-center text-2xl justify-center">
      <SheetIcon className="h-6 w-6 mr-2 inline align-middle" />
      <span className="align-middle">{materialLength}</span>
    </div>
  )
}

export const CutView = ({
  design,
  patternConfig,
  settings,
  setSettings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  Design,
}) => {
  const { t } = useTranslation(['workbench', 'plugin'])

  const materialSettings = useMaterialSettings({ ui, units: settings.units })
  const { pattern, renderProps } = useMaterialDraft({ settings, ui, Design, materialSettings })
  const materialList = useMaterialList(pattern)

  const setActiveMaterial = useCallback(
    (newMaterial) => {
      update.ui(activeMaterialPath, newMaterial)
    },
    [update]
  )

  useEffect(() => {
    if (materialList.length && !materialList.includes(materialSettings.activeMaterial))
      setActiveMaterial(materialList[0])
  }, [materialSettings, materialList, setActiveMaterial])

  return (
    <PatternWithMenu
      noHeader
      {...{
        settings,
        ui,
        update,
        control: account.control,
        account,
        design,
        setSettings,
        title: (
          <div className="px-2 flex flex-wrap justify-between items-baseline">
            <h2 className="capitalize">
              {t('layoutThing', { thing: design }) + ' ' + t('forCutting')}
            </h2>
            <MaterialCounter settings={settings} renderProps={renderProps} />
          </div>
        ),
        pattern: (
          <div className="my-4 grow">
            {materialList.length > 1 ? (
              <div className="tabs">
                {materialList.map((title) => (
                  <button
                    key={title}
                    className={`text-xl font-bold capitalize tab tab-bordered grow ${
                      materialSettings.activeMaterial === title ? 'tab-active' : ''
                    }`}
                    onClick={() => setActiveMaterial(title)}
                  >
                    {t('plugin:' + title)}
                  </button>
                ))}
              </div>
            ) : null}
            <MovablePattern
              {...{
                renderProps,
                update,
                immovable: ['material'],
                layoutPath: ['layouts', 'cut', materialSettings.activeMaterial],
                showButtons: !ui.hideMovableButtons,
              }}
            />
          </div>
        ),
        menu: (
          <>
            <V3Wip />
            <CutMenu
              {...{
                design,
                pattern,
                patternConfig,
                settings,
                ui,
                update,
                language,
                account,
                DynamicDocs,
                materialSettings,
                setSettings,
              }}
            />
          </>
        ),
      }}
    />
  )
}
