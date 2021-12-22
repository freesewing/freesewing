import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// Shared components
import Logo from 'shared/components/logos/freesewing.js'
import PrimaryNavigation from 'shared/components/navigation/primary'
import get from 'lodash.get'

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
    crumbs.push([page.__linktitle, '/'+chunks.slice(0,j).join('/'), (j < chunks.length)])
  }

  return (
    <ul className="flex flex-row gap-2 font-bold">
      <li>
        <Link href="/">
          <a title="To the homepage">
            <Logo size={24} />
          </a>
        </Link>
      </li>
      {crumbs.map(crumb => (
        <>
          <li>&raquo;</li>
          <li>
            {crumb[2]
              ?  (
                <Link href={crumb[1]}>
                  <a title={crumb[0]} className="text-secondary hover:text-secondary-focus">
                    {crumb[0]}
                  </a>
                </Link>
              )
              : crumb[0]
            }
          </li>
        </>
      ))}
    </ul>
  )
}


const DefaultLayout = ({ app, title=false, children=[]}) => {

  const router = useRouter()
  const slug = router.asPath.slice(1)
  const [leftNav, setLeftNav] = useState(false)

  const toggleLeftNav = () => setLeftNav(!leftNav)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    lg:py-8
    `} data-theme={app.theme}>
      <header className={`
        bg-primary
        p-4
        block
        sm:hidden
      `}>
        header
      </header>
      <main className={`
        grow flex flex-row
        sm:py-8
        gap-2
        lg:gap-16
        xl:gap-32
      `}>
        <aside className={`
          fixed top-0 right-0
          ${app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
          sm:relative sm:transform-none
          h-screen w-screen
          bg-base-50
          sm:bg-base-50
          sm:max-w-[38.2%]
          sm:flex sm:flex-row-reverse
          sm:sticky
          overflow-y-scroll
          py-4
        `}>
          <PrimaryNavigation app={app} active={slug}/>
        </aside>
        <section className='max-w-screen-lg lg:pt-8 p-4'>
          {title && (
            <>
              <Breadcrumbs app={app} slug={slug} title={title} />
              <PageTitle app={app} slug={slug} title={title} />
            </>
          )}
          {children}
        </section>
      </main>
      <footer className="bg-primary p-8">footer</footer>
    </div>
  )
}

export default DefaultLayout
