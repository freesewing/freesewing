// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/use-theme.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import {
  SearchIcon,
  ThemeIcon,
  MenuIcon,
  CodeIcon,
  DocsIcon,
  FreeSewingIcon,
  HeartIcon,
  PlusIcon,
  RocketIcon,
  TutorialIcon,
  YouTubeIcon,
} from 'shared/components/icons.mjs'
import { HeaderWrapper } from 'shared/components/wrappers/header.mjs'
import { ModalThemePicker, ns as themeNs } from 'shared/components/modal/theme-picker.mjs'
import { ModalMenu } from 'site/components/navigation/modal-menu.mjs'
import { NavButton, NavSpacer } from 'shared/components/header.mjs'

export const ns = ['common', 'header', 'sections', ...themeNs]

const NavIcons = ({ setModal, slug }) => {
  const { t } = useTranslation(['header'])
  const iconSize = 'h-6 w-6 lg:h-12 lg:w-12'
  const { spectrum } = useTheme()

  return (
    <>
      <NavButton
        onClick={() => setModal(<ModalMenu slug={slug} />)}
        label={t('header:menu')}
        color={spectrum[0]}
      >
        <MenuIcon className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton href="/guides" label="Guides" color={spectrum[1]} extraClasses="hidden lg:flex">
        <RocketIcon className={iconSize} />
      </NavButton>
      <NavButton href="/howtos" label="Howtos" color={spectrum[1]} extraClasses="hidden lg:flex">
        <DocsIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/reference"
        label="Reference"
        color={spectrum[1]}
        extraClasses="hidden lg:flex"
      >
        <CodeIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/tutorials"
        label="Tutorials"
        color={spectrum[1]}
        extraClasses="hidden lg:flex"
      >
        <TutorialIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/training"
        label="Training"
        color={spectrum[1]}
        extraClasses="hidden lg:flex"
      >
        <YouTubeIcon fill stroke={0} className={iconSize} />
      </NavButton>
      <NavSpacer />
      <NavButton
        href="https://freesewing.org/"
        label="About"
        color={spectrum[3]}
        extraClasses="hidden lg:flex"
      >
        <FreeSewingIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="/contribute"
        label="Contribute"
        color={spectrum[3]}
        extraClasses="hidden lg:flex"
      >
        <PlusIcon className={iconSize} />
      </NavButton>
      <NavButton
        href="https://freesewing.org/support"
        label="Support"
        color={spectrum[3]}
        extraClasses="hidden lg:flex"
      >
        <HeartIcon className={iconSize} fill stroke={0} />
      </NavButton>
      <NavSpacer />
      <NavButton
        onClick={() => setModal(<ModalThemePicker />)}
        label={t('header:theme')}
        color={spectrum[8]}
      >
        <ThemeIcon className={iconSize} />
      </NavButton>
      <NavButton href="/search" label={t('header:search')} color={spectrum[9]}>
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
