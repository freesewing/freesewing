// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import {
  BeakerIcon,
  BriefcaseIcon,
  ClearIcon,
  CodeIcon,
  CutIcon,
  HelpIcon,
  MenuIcon,
  OptionsIcon,
  PrintIcon,
  SettingsIcon,
  UploadIcon,
  WrenchIcon,
} from 'shared/components/icons.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import Link from 'next/link'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'

export const ns = ['workbench', 'sections']

export const NavButton = ({
  href,
  label,
  color,
  children,
  onClick = false,
  extraClasses = '',
  active = false,
}) => {
  const className =
    'border-0 px-1 lg:px-4 text-base py-3 lg:py-4 text-center flex flex-col items-center 2xl:w-36 ' +
    `hover:bg-${color}-400 text-${color}-400 hover:text-neutral grow lg:grow-0 relative ${extraClasses} ${
      active ? 'font-heavy' : ''
    }`
  const span = <span className="block font-bold hidden 2xl:block">{label}</span>

  return onClick ? (
    <button {...{ onClick, className }} title={label}>
      {children}
      {span}
    </button>
  ) : (
    <Link {...{ href, className }} title={label}>
      {children}
      {span}
    </Link>
  )
}

export const NavSpacer = () => (
  <div className="hidden lg:block text-base lg:text-4xl font-thin opacity-30 px-0.5 lg:px-2">|</div>
)

export const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'purple',
]
const views = ['menu', 'draft', 'test', 'print', 'cut', 'save', 'export', 'edit', 'clear', 'help']

const NavIcons = ({ setModal, setView, view }) => {
  const { t } = useTranslation(['header'])
  const iconSize = 'h-6 w-6 lg:h-12 lg:w-12'

  return (
    <>
      <NavButton
        onClick={() => setModal(<ModalMenu />)}
        label={t('workbench:menu')}
        color={colors[0]}
      >
        <MenuIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setView('draft')}
        label={t('workbench:draft')}
        color={colors[1]}
        active={view === 'draft'}
      >
        <OptionsIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('test')}
        label={t('workbench:test')}
        color={colors[2]}
        extraClasses="hidden lg:flex"
      >
        <BeakerIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('print')}
        label={t('workbench:printLayout')}
        color={colors[3]}
        extraClasses="hidden lg:flex"
      >
        <PrintIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('cut')}
        label={t('workbench:cutLayout')}
        color={colors[4]}
        extraClasses="hidden lg:flex"
      >
        <CutIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setView('save')}
        label={t('workbench:save')}
        color={colors[5]}
        extraClasses="hidden lg:flex"
      >
        <UploadIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('export')}
        label={t('workbench:export')}
        color={colors[6]}
        extraClasses="hidden lg:flex"
      >
        <BriefcaseIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('edit')}
        label={t('workbench:edit')}
        color={colors[7]}
        extraClasses="hidden lg:flex"
      >
        <CodeIcon className={iconSize} />
      </NavButton>
      <NavButton
        onClick={() => setView('clear')}
        label={t('workbench:clear')}
        color={colors[8]}
        extraClasses="hidden lg:flex"
      >
        <ClearIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/account" label={t('workbench:help')} color={colors[9]}>
        <HelpIcon className={iconSize} />
      </NavButton>
    </>
  )
}

export const WorkbenchHeader = ({ view, setView }) => {
  const { setModal } = useContext(ModalContext)
  const { loading } = useContext(LoadingContext)
  const [show, setShow] = useState(true)

  return (
    <header
      className={`
      fixed bottom-0 lg:bottom-auto lg:top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      ${show || loading ? '' : 'fixed bottom-0 lg:top-0 left-0 translate-y-36 lg:-translate-y-36'}
      drop-shadow-xl
    `}
    >
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden lg:flex lg:px-2 flex-row items-center justify-center w-full">
            <NavIcons setModal={setModal} setView={setView} view={view} />
          </div>

          {/* Mobile content */}
          <div className="flex lg:hidden flex-row items-center justify-between w-full">
            <NavIcons setModal={setModal} setView={setView} />
          </div>
        </div>
      </div>
      <Ribbon />
    </header>
  )
}
