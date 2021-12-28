import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// Shared components
import Logo from 'shared/components/logos/freesewing.js'
import PrimaryNavigation from 'shared/components/navigation/primary'
import get from 'lodash.get'
// Site components
import Header from 'site/components/header'
import Footer from 'site/components/footer'

const iconSize= 48

const PageTitle = ({ app, slug, title }) => {
  if (title) return <h1>{title}</h1>
  if (slug) return <h1>{get(app.navigation, slug.split('/')).__title}</h1>

  return <h1>FIXME: This page has no title</h1>
}

const Breadcrumbs = ({ app, slug=false, title }) => {
  if (!slug) return null
  const crumbs = []
  const chunks = slug.split('/')
  for (const i in chunks) {
    const j = parseInt(i)+parseInt(1)
    const page = get(app.navigation, chunks.slice(0,j))
    if (page) crumbs.push([page.__linktitle, '/'+chunks.slice(0,j).join('/'), (j < chunks.length)])
  }

  return (
    <ul className="flex flex-row flex-wrap gap-2 font-bold">
      <li>
        <Link href="/">
          <a title="To the homepage" className="text-base-content">
            <Logo size={24} fill="currentColor" stroke={false}/>
          </a>
        </Link>
      </li>
      {crumbs.map(crumb => (
        <>
          <li className="text-base-content">&raquo;</li>
          <li>
            {crumb[2]
              ?  (
                <Link href={crumb[1]}>
                  <a title={crumb[0]} className="text-secondary hover:text-secondary-focus">
                    {crumb[0]}
                  </a>
                </Link>
              )
              : <span className="text-base-content">{crumb[0]}</span>
            }
          </li>
        </>
      ))}
    </ul>
  )
}


const DefaultLayout = ({ app, title=false, children=[]}) => {

  const router = useRouter()
  router?.events?.on('routeChangeStart', () => app.startLoading())
  router?.events?.on('routeChangeComplete', () => app.stopLoading())
  const slug = router.asPath.slice(1)
  const [leftNav, setLeftNav] = useState(false)

  const toggleLeftNav = () => setLeftNav(!leftNav)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `} data-theme={app.theme}>
      <Header app={app}/>
      <div className={`
        h-1 w-full theme-gradient ${app.loading ? 'loading' : ''}
        fixed top-0 right-0 z-40
        -mt-1
        hidden sm:block
      `}></div>
      <main className={`
        grow flex flex-row
        sm:py-8
        gap-2
        lg:gap-8
        xl:gap-16
      `}>
        <aside className={`
          fixed top-0 right-0
          ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
          pt-24
          sm:pt-4
          sm:relative sm:transform-none
          h-screen w-screen
          bg-base-100
          sm:bg-base-50
          sm:max-w-[38.2%]
          sm:flex sm:flex-row-reverse
          sm:sticky
          overflow-y-scroll
          py-4
          z-20
        `}>
          <PrimaryNavigation app={app} active={slug}/>
        </aside>
        <section className='max-w-61.8% lg:pt-8 p-4 w-full'>
          {title && (
            <>
              <Breadcrumbs app={app} slug={slug} title={title} />
              <PageTitle app={app} slug={slug} title={title} />
            </>
          )}
          {children}
        </section>
      </main>
      <Footer app={app} />
    </div>
  )
}

export default DefaultLayout
