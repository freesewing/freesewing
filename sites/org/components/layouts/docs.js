import { useRouter } from 'next/router'
import Aside from 'site/components/navigation/aside'

const DefaultLayout = ({ app, title = false, children = [] }) => {
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
        <Aside app={app} slug={slug} />
      </section>
      <section className="py-8 lg:py-16 px-6 xl:pl-8 2xl:pl-16">
        <div>
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </section>
    </div>
  )
}

export default DefaultLayout
