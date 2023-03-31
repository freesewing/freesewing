// Hooks
import { useRouter } from 'next/router'
// Components
import Link from 'next/link'
import { AsideNavigation } from 'site/components/navigation/aside.mjs'
import { ThemePicker } from 'shared/components/theme-picker/index.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { getCrumbs } from 'shared/utils.mjs'
import { HomeIcon } from 'shared/components/icons.mjs'
import { useState, useEffect } from 'react'

export const DocsLayout = ({ app, title = false, crumbs = false, children = [] }) => {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [breadcrumbs, setBreadcrumbs] = useState(crumbs)

  useEffect(() => {
    const newSlug = router.asPath.slice(1)
    setSlug(newSlug)
    if (!breadcrumbs) setBreadcrumbs(getCrumbs(app, newSlug, title))
  }, [router.asPath, breadcrumbs, app, title])

  return (
    <div className="grid grid-cols-4 m-auto justify-center place-items-stretch">
      <AsideNavigation
        app={app}
        slug={slug}
        before={[
          <div className="flex flex-row items-center justify-between border-b mb-4" key="home-key">
            <Link href="/">
              <HomeIcon />
            </Link>
            <ThemePicker app={app} />
          </div>,
        ]}
      />
      <section className="col-span-4 lg:col-span-3 py-24 px-4 lg:pl-8 bg-base-50">
        {title && (
          <div className="xl:pl-4">
            <Breadcrumbs title={title} crumbs={breadcrumbs} />
            <h1 className="break-words">{title}</h1>
          </div>
        )}
        {children}
      </section>
    </div>
  )
}
