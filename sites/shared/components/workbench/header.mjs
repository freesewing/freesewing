// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import {
  BeakerIcon,
  BriefcaseIcon,
  CodeIcon,
  CutIcon,
  HelpIcon,
  HomeIcon,
  MenuIcon,
  OptionsIcon,
  PrintIcon,
  UploadIcon,
} from 'shared/components/icons.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'
import { NavButton, NavSpacer, colors } from 'shared/components/header.mjs'

export const ns = ['workbench', 'sections']

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
      <NavSpacer />
      <NavButton
        label={t('workbench:help')}
        color={colors[8]}
        href="/docs/site/draft"
        extraClasses="hidden lg:flex"
      >
        <HelpIcon className={iconSize} />
      </NavButton>
      <NavButton label={t('workbench:home')} color={colors[9]} href="/">
        <HomeIcon className={iconSize} />
      </NavButton>
    </>
  )
}

export const WorkbenchHeader = ({ view, setView, update }) => {
  const { setModal } = useContext(ModalContext)

  return (
    <header
      className={`
      fixed bottom-0 lg:bottom-auto lg:top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      drop-shadow-xl
    `}
    >
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden lg:flex lg:flex-row lg:justify-between items-center xl:justify-center w-full">
            <NavIcons setModal={setModal} setView={setView} view={view} />
          </div>

          {/* Mobile content */}
          <div className="flex lg:hidden flex-row items-center justify-between w-full">
            <NavIcons {...{ setModal, setView, update }} />
          </div>
        </div>
      </div>
      <Ribbon />
    </header>
  )
}
