import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/theme-chooser'
import NavLink, { classes, iconSize, Mini } from '@/shared/components/navigation/navlink'

const l = (t, to, title, subtitle, icon) => (
  <NavLink
    href={to}
    title={typeof title === 'string' ? t(title) : t(...title)}
    subtitle={typeof subtitle === 'string' ? t(subtitle) : t(...subtitle)}
    icon={icon}
  />
)

const ExtraNavs = props => {
  const { t } = props
  const navs = {
    theme: <ThemeChooser
      block={props.menu}
      iconSize={iconSize}
      classes={classes}
      mini={<Mini>{t('yourX', {x: t('colors')})}
      </Mini>}
    />,
    home: l(t, '/', 'home', 'freesewing.org', 'freesewing'),
    blog: l(t, '/blog', 'blog', 'forByMakers', 'blog'),
    docs: l(t, '/docs', 'support', 'docs', 'docs'),
    join: l(t, '/patrons/join', 'supportUs', 'becomeAPatron', 'community'),
    docs: <NavLink
      href='/docs'
      title={t('support')}
      subtitle={`& ${t('docs')}`}
      icon='support'
    />,
    designs: l(t,
      '/designs', 'designs',
      ['ourX', {x: t('collection')}],
      'designs'
    ),
    discord: l(t,
      'https://discord.freesewing.org/', 'community',
      ['onX', {x:'Discord'}],
      'discord'
    ),
    github: l(t,
      'https://github.com/freesewing/freesewing', 'code',
      ['onX', {x:'Github'}],
      'github'
    ),
    showcase: l(t, '/showcase', 'Showcase',
      ['yourX', {x: t('makes')}],
      'showcase'
    ),
    search: (
      <button
        className={`${classes.btn} lg:w-auto`}
        onClick={props.toggleSearch}
      >
        <div className={classes.btnWrap}>
          <Icon icon='search' size={iconSize} className="hidden lg:inline"/>
          <span className={classes.btnSpan}>
            {t('search')}
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
        <div className="hidden lg:flex lg:flex-row lg:gap-2 items-start">
          {navs.home}
          {navs.designs}
          {navs.showcase}
          {navs.blog}
          {navs.docs}
        </div>
        <div className="lg:hidden flex flex-row flex-1 divide-x divide-base-300 py-1">
          <div className="w-1/2 px-1">{navs.search}</div>
          <div className="w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.search}
          {navs.discord}
          {navs.theme}
        </div>
      </>
    )
}

export default ExtraNavs
