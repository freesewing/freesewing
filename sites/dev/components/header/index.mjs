// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import {
  I18nIcon,
  SearchIcon,
  ThemeIcon,
  MenuIcon,
  DesignIcon,
  CodeIcon,
  DocsIcon,
  WrenchIcon,
  FreeSewingIcon,
  HeartIcon,
} from 'shared/components/icons.mjs'
import { HeaderWrapper } from 'shared/components/wrappers/header.mjs'
import { ModalThemePicker, ns as themeNs } from 'shared/components/modal/theme-picker.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'
import { NavButton, NavSpacer } from 'shared/components/header.mjs'

export const ns = ['common', 'header', 'sections', ...themeNs]

const NavIcons = ({ setModal, slug }) => {
  const { t } = useTranslation(['header'])
  const iconSize = 'h-6 w-6 lg:h-12 lg:w-12'

  return (
    <>
      <NavButton
        onClick={() => setModal(<ModalMenu slug={slug} />)}
        label={t('header:menu')}
        color={0}
      >
        <MenuIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/api" label="API Docs" color={1} extraClasses="hidden lg:flex">
        <DocsIcon className={iconSize} />
      </NavButton>
      <NavButton href="/design" label="Design" color={2} extraClasses="hidden lg:flex">
        <DesignIcon className={iconSize} />
      </NavButton>
      <NavButton href="/contribute" label="Contribute" color={3} extraClasses="hidden lg:flex">
        <CodeIcon className={iconSize} />
      </NavButton>
      <NavButton href="/i18n" label="Translate" color={4} extraClasses="hidden lg:flex">
        <I18nIcon className={iconSize} />
      </NavButton>
      <NavButton href="/infra" label="Infrastrucure" color={5} extraClasses="hidden lg:flex">
        <WrenchIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/about" label="About" color={6} extraClasses="hidden lg:flex">
        <FreeSewingIcon className={iconSize} />
      </NavButton>
      <NavButton href="/support" label="Support" color={7} extraClasses="hidden lg:flex">
        <HeartIcon className={iconSize} fill />
      </NavButton>
      <NavSpacer />
      <NavButton onClick={() => setModal(<ModalThemePicker />)} label={t('header:theme')} color={8}>
        <ThemeIcon className={iconSize} />
      </NavButton>
      <NavButton href="/search" label={t('header:search')} color={9}>
        <SearchIcon className={iconSize} />
      </NavButton>
    </>
  )
}

export const Header = ({
  show = true, // Whether or not to show the header
  slug, // Slug of the current page
}) => {
  const { setModal } = useContext(ModalContext) || {}

  const headerIcons = <NavIcons {...{ setModal, slug }} />

  return show ? (
    <HeaderWrapper {...{ show, slug }}>
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden lg:flex lg:px-2 flex-row items-center justify-between xl:justify-center w-full">
            {headerIcons}
          </div>

          {/* Mobile content */}
          <div className="flex lg:hidden flex-row items-center justify-between w-full">
            {headerIcons}
          </div>
        </div>
      </div>
    </HeaderWrapper>
  ) : null
}
