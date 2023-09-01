import { PrintSettings, ns as printMenuNs } from './settings.mjs'
import { PrintActions } from './actions.mjs'
import { PrintIcon, CompareIcon } from 'shared/components/icons.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import { useTranslation } from 'next-i18next'
import { horFlexClasses, capitalize } from 'shared/utils.mjs'

export const ns = printMenuNs

const PageCounter = ({ pattern, t, ui, settings }) => {
  const pages = pattern.setStores[0].get('pages', {})
  const format = ui.print?.pages?.size
    ? ui.print.pages.size
    : settings.units === 'imperial'
    ? 'letter'
    : 'a4'
  const { cols, rows, count } = pages

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 mb-2 py-2">
      <b>{t('workbench:currentPrintLayout')}:</b>
      <div className="flex flex-row flex-wrap items-center gap-1">
        <span>
          {count} {capitalize(format)} {t('workbench:pages')},
        </span>
        <span>
          {cols} {t('workbench:columns')},
        </span>
        <span>
          {rows} {t('workbench:rows')}
        </span>
      </div>
      <div className="flex flex-row flex-wrap items-center italic">
        ({t('workbench:xTotalPagesSomeBlank', { total: cols * rows, blank: cols * rows - count })})
      </div>
    </div>
  )
}

export const PrintMenu = ({
  design,
  patternConfig,
  settings,
  ui,
  update,
  language,
  account,
  DynamicDocs,
  exportIt,
  pattern,
}) => {
  const { t } = useTranslation()
  const menuProps = {
    design,
    patternConfig,
    settings,
    update,
    language,
    account,
    DynamicDocs,
    control: account.control,
  }

  const sections = [
    {
      name: 'printSettings',
      ns: 'workbench',
      icon: <PrintIcon className="w-8 h-8" />,
      menu: <PrintSettings {...menuProps} ui={ui} />,
    },
    {
      name: 'layoutSettings',
      ns: 'workbench',
      icon: <CompareIcon className="w-8 h-8" />,
      menu: <PrintActions {...menuProps} ui={ui} />,
    },
  ]
  console.log(ui)
  return (
    <>
      <PageCounter {...{ pattern, t, ui, settings }} />
      <button className={`${horFlexClasses} btn btn-primary btn-lg`} onClick={exportIt}>
        <PrintIcon className="w-8 h-8" />
        {t('workbench:generatePdf')}
      </button>
      <Accordion
        items={sections.map((section) => [
          <>
            <h5 className="flex flex-row gap-2 items-center justify-between w-full">
              <span>{t(`${section.ns}:${section.name}.t`)}</span>
              {section.icon}
            </h5>
            <p className="text-left">{t(`${section.ns}:${section.name}.d`)}</p>
          </>,
          section.menu,
        ])}
      />
    </>
  )
}
