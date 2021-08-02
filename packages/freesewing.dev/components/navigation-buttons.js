import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/navigation/pickers/theme'
import NavLink, { classes, iconSize, Mini } from '@/shared/components/navigation/navlink'

const l = (to, title, subtitle, icon, mobile) => (
  <NavLink href={to} title={title} subtitle={subtitle} icon={icon} mobile={mobile}/>
)

const ExtraNavs = props => {
  const t = props.t ? props.t : (x) => x.slice(0,6) === 'theme.' ? x.slice(6) : x
  const navs = {
    theme: <ThemeChooser
      mobile={props.menu}
      iconSize={iconSize}
      classes={classes}
      mini={<Mini>Colors</Mini>}
      t={t}
    />,
    home: l('/', 'home', 'freesewing.dev', 'freesewing', props.menu),
    blog: l('/blog', 'blog', 'For/By Developers', 'blog', props.menu),
    join: l('/patrons/join', 'supportUs', 'becomeAPatron', 'community', props.menu),
    discord: l(
      'https://discord.freesewing.org/',
      props.menu ? 'FreeSewing on Discord' : 'Or ask on Discord',
      'Come say hi',
      'discord',
      props.menu
    ),
    github: l(
      'https://github.com/freesewing/freesewing',
      props.menu ? 'FreeSewing on Github' : 'code',
      'On Github',
      'github',
      props.menu
    ),
    search: (
      <button
        className={`${classes.btn} lg:w-auto`}
        onClick={props.toggleSearch}
      >
        <div className={classes.btnWrap}>
          <Icon icon='search' size={iconSize} className="hidden lg:inline"/>
          <span className={classes.btnSpan}>
            Search<span className="hidden lg:inline"> for answers</span>
            <Mini>[Ctrlk-k]</Mini>
          </span>
        </div>
      </button>
    ),
    menu: (
      <button
        className={`${classes.btn} lg:w-auto ${props.menu ? 'pt-2 pb-2' : ''}`}
        title="Open menu"
        onClick={props.toggleMenu}
      >
        <div className={classes.btnWrap}>
          <span className={classes.btnSpan}>{props.menu && 'Close '} Menu</span>
        </div>
      </button>
    ),
  }

  return props.menu
    ? props.navbar
      ? navs.menu
      : [navs.theme, navs.discord, navs.github]
    : (
      <>
        <div className="hidden lg:flex lg:flex-row lg:gap-2 items-start">
          {navs.blog}
        </div>
        <div className="flex flex-row flex-1 divide-x divide-base-300 py-0 lg:divide-none lg:justify-center">
          <div className="w-1/2 px-1 lg:w-auto">{navs.search}</div>
          <div className="hidden w-1/2 px-1 lg:block">{navs.discord}</div>
          <div className="lg:hidden w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.theme}
          {navs.github}
        </div>
      </>
    )
}

export default ExtraNavs
