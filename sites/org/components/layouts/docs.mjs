import { useRouter } from 'next/router'
import { AsideNavigation } from 'site/components/navigation/aside.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'

export const DocsLayout = ({ app, title = false, children = [], crumbs = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <div className="m-auto flex flex-row justify-start">
      <section
        className={`
        w-0 lg:w-1/3 flex flex-row justify-end
        border-0 py-20
        md:px-4
        bg-base-200
        shrink-0
        md:border-r md:border-base-300
        lg:block
        `}
      >
        <AsideNavigation app={app} slug={slug} />
      </section>
      <section className="py-8 lg:py-16 px-6 xl:pl-8 2xl:pl-16 w-full max-w-2xl">
        <div>
          <Breadcrumbs crumbs={crumbs} />
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </section>
    </div>
  )
}
