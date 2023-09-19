// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import {
  DesignIcon,
  DocsIcon,
  MenuIcon,
  SearchIcon,
  ShowcaseIcon,
  UserIcon,
  ThemeIcon,
  I18nIcon,
  HeartIcon,
  PlusIcon,
  RssIcon,
} from 'shared/components/icons.mjs'
import { HeaderWrapper } from 'shared/components/wrappers/header.mjs'
import { ModalThemePicker, ns as themeNs } from 'shared/components/modal/theme-picker.mjs'
import { ModalLocalePicker, ns as localeNs } from 'shared/components/modal/locale-picker.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'

import { NavButton, NavSpacer, iconSize } from 'shared/components/header.mjs'

export const ns = ['header', 'sections', ...themeNs, ...localeNs]

const NavIcons = ({ setModal, setSearch }) => {
  const { t } = useTranslation(['header'])
  const { spectrum } = useTheme()

  return (
    <>
      <NavButton
        onClick={() => setModal(<ModalMenu />)}
        label={t('header:menu')}
        color={spectrum[0]}
        extraClasses="md:px-4"
      >
        <MenuIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/designs" label={t('header:designs')} color={spectrum[1]}>
        <DesignIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/docs"
        label={t('header:docs')}
        color={spectrum[2]}
        extraClasses="hidden md:flex"
      >
        <DocsIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton
        href="/blog"
        label={t('header:blog')}
        color={spectrum[3]}
        extraClasses="hidden md:flex"
      >
        <RssIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton
        href="/showcase"
        label={t('header:showcase')}
        color={spectrum[4]}
        extraClasses="hidden md:flex"
      >
        <ShowcaseIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavSpacer />
      <NavButton
        href="/new"
        label={t('header:new')}
        color={spectrum[5]}
        extraClasses="hidden lg:flex"
      >
        <PlusIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton href="/account" label={t('header:account')} color={spectrum[6]}>
        <UserIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton
        href="/support"
        label={t('header:support')}
        color={spectrum[7]}
        extraClasses="hidden lg:flex"
      >
        <HeartIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setModal(<ModalThemePicker />)}
        label={t('header:theme')}
        color={spectrum[8]}
      >
        <ThemeIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton
        onClick={() => setModal(<ModalLocalePicker />)}
        label={t('header:language')}
        color={spectrum[9]}
      >
        <I18nIcon className={iconSize} stroke={1.5} />
      </NavButton>
      <NavButton
        onClick={() => setSearch(true)}
        label={t('header:search')}
        color={spectrum[10]}
        extraClasses="md:px-4"
      >
        <SearchIcon className={iconSize} stroke={1.5} />
      </NavButton>
    </>
  )
}

export const Header = () => {
  const { setModal } = useContext(ModalContext)
  return (
    <HeaderWrapper>
      <div className="m-auto">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          {/* Non-mobile content */}
          <div className="hidden md:flex md:flex-row md:justify-between items-center xl:justify-center w-full">
            <NavIcons setModal={setModal} />
          </div>

          {/* Mobile content */}
          <div className="flex md:hidden flex-row items-center justify-between w-full">
            <NavIcons setModal={setModal} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}
