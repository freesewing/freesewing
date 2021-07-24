import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/theme-chooser'
import NavLink, { classes, iconSize, Mini } from '@/shared/components/navigation/navlink'

const ExtraNavs = props => {
  const navs = {
    theme: <ThemeChooser
      block={props.menu}
      iconSize={iconSize}
      classes={classes}
      mini={<Mini>colors</Mini>}
    />,
    home: <NavLink href='/' title='Home' subtitle='freesewing.org' icon='freesewing' />,
    blog: <NavLink href='/blog' title='Blog' subtitle='for/by makers' icon='blog' />,
    discord: <NavLink href='https://discord.freesewing.org/' title='Chat' subtitle='on Discord' icon='discord' />,
    github: <NavLink href='https://github.com/freesewing/freesewing' title='Code' subtitle='on Github' icon='github' />,
    search: (
      <button
        className={`${classes.btn} lg:w-auto`}
        onClick={props.toggleSearch}
      >
        <div className={classes.btnWrap}>
          <Icon icon='search' size={iconSize} className="hidden lg:inline"/>
          <span className={classes.btnSpan}>
            Search
            <Mini>[Ctrlk-k]</Mini>
          </span>
        </div>
      </button>
    ),
    menu: (
      <button
        className={`${classes.btn} lg:w-auto`}
        title="Open menu"
        onClick={props.toggleMenu}
      >
        {!props.menu && <Icon icon='menu' size={iconSize} className="hidden lg:inline"/>}
        <span className={classes.btnSpan}>{props.menu && 'Close '} Menu</span>
      </button>
    ),
  }

  return props.menu
    ? props.navbar
      ? navs.menu
      : [navs.theme, navs.discord, navs.github]
    : (
      <>
        <div className="hidden lg:flex lg:flex-row lg:gap-4 items-start">
          {navs.home}
          {navs.blog}
          {navs.search}
        </div>
        <div className="lg:hidden flex flex-row flex-1 divide-x divide-base-300 py-1">
          <div className="w-1/2 px-1">{navs.search}</div>
          <div className="w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.theme}
          {navs.discord}
          {navs.github}
        </div>
      </>
    )
}

export default ExtraNavs
