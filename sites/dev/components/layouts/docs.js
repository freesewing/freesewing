import { useRouter } from 'next/router'
// Shared components
import Aside from 'site/components/navigation/aside.js'
import ThemePicker from 'shared/components/theme-picker.js'
import Breadcrumbs from 'shared/components/breadcrumbs.js'
import { getCrumbs } from 'shared/utils'
import HomeIcon from 'shared/components/icons/home.js'
import Link from 'next/link'

const DefaultLayout = ({ app, title = false, crumbs = false, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)
  const breadcrumbs = crumbs ? crumbs : getCrumbs(app, slug, title)

  return (
    <div className="grid grid-cols-4 m-auto justify-center place-items-stretch">
      <Aside
        app={app}
        slug={slug}
        before={[
          <div className="flex flex-row items-center justify-between border-b mb-4">
            <Link href="/">
              <a>
                <HomeIcon />
              </a>
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

export default DefaultLayout
