//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { controlLevels } from 'shared/config/freesewing.config.mjs'
// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import {
  BeakerIcon,
  CodeIcon,
  CutIcon,
  OptionsIcon,
  PrintIcon,
  SaveIcon,
  SaveAsIcon,
  RightIcon,
  LeftIcon,
  DocsIcon,
  MeasieIcon,
  XrayIcon,
  EditIcon,
  ExportIcon,
} from 'shared/components/icons.mjs'
import Link from 'next/link'
import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'

export const ns = ['workbench', 'sections']

const icons = {
  test: BeakerIcon,
  export: ExportIcon,
  Edit: EditIcon,
  cut: CutIcon,
  draft: OptionsIcon,
  print: PrintIcon,
  save: SaveIcon,
  saveas: SaveAsIcon,
  logs: CodeIcon,
  inspect: XrayIcon,
  measies: MeasieIcon,
}

export const NavButton = ({
  href,
  label,
  children,
  onClick = false,
  active = false,
  extraClasses = 'lg:hover:bg-secondary lg:hover:text-secondary-content',
}) => {
  const className = `w-full flex flex-row items-center px-4 py-2 ${extraClasses} ${
    active
      ? 'font-bold lg:font-normal bg-secondary bg-opacity-10 lg:bg-secondary lg:text-secondary-content lg:bg-opacity-50'
      : 'lg:bg-neutral lg:text-neutral-content'
  }`
  const span = <span className="block grow text-left">{label}</span>

  return onClick ? (
    <button {...{ onClick, className }} title={label}>
      {span}
      {children}
    </button>
  ) : (
    <Link {...{ href, className }} title={label}>
      {span}
      {children}
    </Link>
  )
}

const NavIcons = ({ setView, setDense, dense, view, saveAs = false, control }) => {
  const { t } = useTranslation(['header'])
  const iconSize = 'h-6 w-6 grow-0'

  return (
    <>
      <NavButton
        onClick={() => setDense(!dense)}
        label=""
        extraClasses="hidden lg:flex text-accent bg-neutral hover:bg-accent hover:text-neutral-content"
      >
        {dense ? (
          <RightIcon
            className={`${iconSize} group-hover:animate-[bounceright_1s_infinite] animate-[bounceright_1s_5]`}
            stroke={4}
          />
        ) : (
          <LeftIcon className={`${iconSize} animate-bounce-right`} stroke={4} />
        )}
      </NavButton>
      {control >= controlLevels.views.draft && (
        <NavButton
          onClick={() => setView('draft')}
          label={t('workbench:patternEditor')}
          active={view === 'draft'}
        >
          <OptionsIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.measies && (
        <NavButton
          onClick={() => setView('measies')}
          label={t('workbench:measies')}
          active={view === 'measies'}
        >
          <MeasieIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.test && (
        <NavButton
          onClick={() => setView('test')}
          label={t('workbench:patternTests')}
          active={view === 'test'}
        >
          <BeakerIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.print && (
        <NavButton
          onClick={() => setView('print')}
          label={t('workbench:printLayout')}
          active={view === 'print'}
        >
          <PrintIcon className={iconSize} />
        </NavButton>
      )}
      {/*!isProduction && (
        <NavButton
          onClick={() => setView('cut')}
          label={t('workbench:cutLayout')}
          active={view === 'cut'}
        >
          <CutIcon className={iconSize} />
        </NavButton>
      )*/}
      {control >= controlLevels.views.save && (
        <NavButton
          onClick={() => setView('save')}
          label={t(`workbench:${saveAs ? 'savePattern' : 'savePatternAsHellip'}`)}
          active={view === 'save'}
        >
          {saveAs ? <SaveIcon className={iconSize} /> : <SaveAsIcon className={iconSize} />}
        </NavButton>
      )}
      {control >= controlLevels.views.export && (
        <NavButton
          onClick={() => setView('export')}
          label={t('workbench:exportPattern')}
          active={view === 'export'}
        >
          <ExportIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.edit && (
        <NavButton
          onClick={() => setView('edit')}
          label={t('workbench:editByHand')}
          active={view === 'edit'}
        >
          <EditIcon className={iconSize} />
        </NavButton>
      )}{' '}
      {control >= controlLevels.views.logs && (
        <NavButton
          onClick={() => setView('logs')}
          label={t('workbench:patternLogs')}
          active={view === 'logs'}
        >
          <CodeIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.inspect && (
        <NavButton
          onClick={() => setView('inspect')}
          label={t('workbench:patternInspector')}
          active={view === 'inspect'}
        >
          <XrayIcon className={iconSize} />
        </NavButton>
      )}
      {control >= controlLevels.views.docs && (
        <NavButton
          onClick={() => setView('docs')}
          label={t('workbench:docs')}
          active={view === 'docs'}
        >
          <DocsIcon className={iconSize} />
        </NavButton>
      )}
    </>
  )
}

export const WorkbenchHeader = ({ view, setView, saveAs = false, control = 4 }) => {
  const [dense, setDense] = useState(true)
  return (
    <MenuWrapper
      Icon={icons[view]}
      wrapperClass={`w-64 min-h-screen pt-4
        bg-neutral
        shrink-0 grow-0 self-stretch
        transition-all
        drop-shadow-xl
        ${dense ? '-ml-52' : 'ml-0'}`}
      buttonClass={`order-last bottom-16`}
      keepOpenOnClick={false}
      order={0}
      type="nav"
    >
      <header
        className={`
        sticky top-4 lg:top-28
        group
      `}
      >
        <div
          className={`
        flex flex-col
        items-center w-full `}
        >
          <NavIcons {...{ setView, setDense, dense, view, saveAs, control }} />
        </div>
      </header>
    </MenuWrapper>
  )
}
