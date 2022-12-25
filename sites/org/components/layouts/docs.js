import { useRouter } from 'next/router'
// Shared components
import Aside from 'site/components/navigation/aside'
import Breadcrumbs from 'shared/components/breadcrumbs.js'

const DefaultLayout = ({ app, title = false, crumbs = false, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)
  const breadcrumbs = crumbs ? crumbs : null //FIXME getCrumbs(app, slug, title)

  return (
    <div className="m-auto flex flex-row justify-start">
      <section
        className={`
        w-1/3 flex flex-row justify-end
        border-0 py-20
        md:px-4 md:py-12
        bg-base-200
        md:border-r md:border-base-300
        `}
      >
        <Aside app={app} slug={slug} />
      </section>
      <section className="py-8 md:py-24 px-6 xl:pl-8 2xl:pl-16">
        <div>
          {title && (
            <>
              <Breadcrumbs title={title} crumbs={breadcrumbs} />
              <h1>{title}</h1>
            </>
          )}
          {children}
        </div>
      </section>
    </div>
  )
}

export default DefaultLayout
