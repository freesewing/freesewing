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

import { NavButton, NavSpacer, colors } from 'shared/components/header.mjs'

export const ns = ['header', 'sections', ...themeNs]

/*
 * for all developers
 * for pattern designers and coders
 * for infrastructure coders
 * for writers
 * for translators
 * how to work as a team
 * about freesewing
 *
 *
 * designers
 * contributors
 * api
 * translation
 * infra
 * content
 * */

const NavIcons = ({ setModal }) => {
  const { t } = useTranslation(['header'])
  const iconSize = 'h-6 w-6 lg:h-12 lg:w-12'

  return (
    <>
      <NavButton onClick={() => setModal(<ModalMenu />)} label={t('header:menu')} color={colors[0]}>
        <MenuIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/api" label="API Docs" color={colors[1]} extraClasses="hidden lg:flex">
        <DocsIcon className={iconSize} />
      </NavButton>
      <NavButton href="/design" label="Design" color={colors[2]} extraClasses="hidden lg:flex">
        <DesignIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/contribute"
        label="Contribute"
        color={colors[3]}
        extraClasses="hidden lg:flex"
      >
        <CodeIcon className={iconSize} />
      </NavButton>
      <NavButton href="/i18n" label="Translate" color={colors[4]} extraClasses="hidden lg:flex">
        <I18nIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/infra"
        label="Infrastrucure"
        color={colors[5]}
        extraClasses="hidden lg:flex"
      >
        <WrenchIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/about" label="About" color={colors[6]} extraClasses="hidden lg:flex">
        <FreeSewingIcon className={iconSize} />
      </NavButton>
      <NavButton href="/support" label="Support" color={colors[7]} extraClasses="hidden lg:flex">
        <HeartIcon className={iconSize} fill />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setModal(<ModalThemePicker />)}
        label={t('header:theme')}
        color={colors[8]}
      >
        <ThemeIcon className={iconSize} />
      </NavButton>
      <NavButton href="/search" label={t('header:search')} color={colors[9]}>
        <SearchIcon className={iconSize} />
      </NavButton>
    </>
  )
}

export const Header = (props) => {
  const { setModal } = useContext(ModalContext) || {}

  return (
    <HeaderWrapper {...props}>
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden lg:flex lg:px-2 flex-row items-center justify-center w-full">
            <NavIcons setModal={setModal} />
          </div>

          {/* Mobile content */}
          <div className="flex lg:hidden flex-row items-center justify-between w-full">
            <NavIcons setModal={setModal} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}
