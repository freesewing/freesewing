import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/navigation/pickers/theme'
import NavLink, { classes, iconSize, Mini } from '@/shared/components/navigation/navlink'

const l = (to, title, subtitle, icon) => (
  <NavLink href={to} title={title} subtitle={subtitle} icon={icon}/>
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
    home: l('/', 'home', 'freesewing.dev', 'freesewing'),
    blog: l('/blog', 'blog', 'For/By Developers', 'blog'),
    join: l('/patrons/join', 'supportUs', 'becomeAPatron', 'community'),
    discord: l(
      'https://discord.freesewing.org/',
      'Or ask on Discord',
      'Come say hi',
      'discord'
    ),
    github: l(
      'https://github.com/freesewing/freesewing', 'code',
      'On Github',
      'github'
    ),
    search: (
      <button
        className={`${classes.btn} lg:w-auto`}
        onClick={props.toggleSearch}
      >
        <div className={classes.btnWrap}>
          <Icon icon='search' size={iconSize} className="hidden lg:inline"/>
          <span className={classes.btnSpan}>
            Search for answers
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
          {navs.home}
          {navs.blog}
          {navs.search}
          {navs.discord}
        </div>
        <div className="lg:hidden flex flex-row flex-1 divide-x divide-base-300 py-2">
          <div className="w-1/2 px-1">{navs.search}</div>
          <div className="w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.theme}
          {navs.github}
        </div>
      </>
    )
}

export default ExtraNavs
