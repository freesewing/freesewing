import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/navigation/pickers/theme'
import LanguageChooser from '@/shared/components/navigation/pickers/language'
import NavLink, { classes, iconSize, Mini } from '@/shared/components/navigation/navlink'
import config from '@/site/freesewing.config'
import { languages } from '@freesewing/i18n'

const l = (t, to, title, subtitle, icon) => (
  <NavLink
    href={to}
    title={typeof title === 'string' ? t(title) : t(...title)}
    subtitle={typeof subtitle === 'string' ? t(subtitle) : t(...subtitle)}
    icon={icon}
  />
)

const ExtraNavs = props => {
  const t = props.t ? props.t : (x) => x
  const navs = {
    theme: <ThemeChooser
      mobile={props.menu}
      iconSize={props.menu ? 24 : iconSize}
      classes={classes}
      t={props.t}
      mini={<Mini>{t('colors')}</Mini>}
    />,
    language: <LanguageChooser
      mobile={props.menu}
      iconSize={props.menu ? 24 : iconSize}
      classes={classes}
      locale={props.locale}
      languages={props.languages}
      path={props.path}
      t={props.t}
      mini={<Mini>{languages[props.locale]}
      </Mini>}
    />,
    home: l(t, '/', 'home', 'freesewing.org', 'freesewing'),
    blog: l(t, '/blog', 'blog', 'forByMakers', 'blog'),
    join: l(t, '/patrons/join', 'supportUs', 'becomeAPatron', 'community'),
    docs: <NavLink
      href='/docs'
      title={t('docs')}
      subtitle={`& ${t('support')}`}
      icon='support'
    />,
    designs: l(t,
      '/designs', t('designs'),
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
    showcase: <NavLink
      href='/showcase'
      title={t('showcase')}
      subtitle={`& ${t('inspiration')}`}
      icon='showcase'
    />,
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
        <div className={classes.btnWrap}>
          {!props.menu && <Icon icon='menu' size={iconSize} className="hidden lg:inline"/>}
          <span className={classes.btnSpan}>{props.menu && 'Close '} Menu</span>
        </div>
      </button>
    ),
  }

  return props.menu
    ? props.navbar
      ? navs.menu
      : [navs.language, navs.theme, navs.discord, navs.github]
    : (
      <>
        <div className="hidden lg:flex lg:flex-row lg:gap-2 items-start">
          {navs.designs}
          {navs.showcase}
          {navs.blog}
        </div>
        <div className="flex flex-row flex-1 divide-x divide-base-300 py-0 lg:divide-none lg:justify-center">
          <div className="w-1/2 px-1 lg:w-auto">{navs.search}</div>
          <div className="hidden w-1/2 px-1 lg:w-auto">{navs.docs}</div>
          <div className="hidden w-1/2 px-1 lg:w-auto">{navs.discord}</div>
          <div className="lg:hidden w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.theme}
          {navs.language}
        </div>
      </>
    )
}

export default ExtraNavs
