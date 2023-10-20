// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { pages as posts } from 'site/prebuild/showcase.mjs'
import { nsMerge, cloudflareImageUrl, capitalize, horFlexClasses } from 'shared/utils.mjs'
import { examples } from 'site/prebuild/design-examples.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useFilter } from 'shared/components/designs/design-picker.mjs'
// Components
import Link from 'next/link'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ResetIcon } from 'shared/components/icons.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge('common', 'designs', 'tags', pageNs)

const count = Object.values(examples).reduce((acc, val) =>
  Array.isArray(acc) ? acc.length + val.length : acc + val.length
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const ShowcaseIndexPage = ({ page }) => {
  const { t } = useTranslation()
  const [filter, setFilter] = useFilter()

  const list =
    filter && examples[filter]
      ? examples[filter].map((id) => `showcase/${id}`)
      : Object.keys(posts[page.locale])

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="p-4 m-auto">
        <h1 className="text-center">FreeSewing - {t('sections:showcase')}</h1>
        <div className="max-w-7xl m-auto">
          <h4 className="text-center max-w-md m-auto">
            {filter && examples[filter] ? (
              <>
                <button
                  className={`btn btn-secondary btn-outline ${horFlexClasses}`}
                  onClick={() => setFilter(null)}
                >
                  <span>
                    {Object.keys(examples[filter]).length}/{count}
                  </span>
                  {capitalize(filter)}
                  <ResetIcon />
                </button>
              </>
            ) : (
              <span>
                {count}/{count}
              </span>
            )}
          </h4>

          <div className="flex flex-row gap-1 items-center justify-center flex-wrap my-4">
            {Object.keys(examples)
              .sort()
              .map((design) => (
                <button
                  key={design}
                  className={`badge font-medium hover:shadow
               ${
                 filter && examples[filter] && filter === design
                   ? 'badge badge-success hover:badge-error'
                   : 'badge badge-primary hover:badge-success'
               }`}
                  onClick={() => setFilter(design)}
                >
                  {design}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:gap-4 xl:grid-cols-4 2xl:grid-cols-6 px-4 mb-8">
        {list.map((slug) => (
          <Link href={`/${slug}`} className="text-center" key={slug}>
            <img
              src={cloudflareImageUrl({ id: slug.replace('/', '-'), variant: 'sq500' })}
              loading="lazy"
              className="rounded-lg w-full"
            />
          </Link>
        ))}
      </div>
    </PageWrapper>
  )
}

export default ShowcaseIndexPage

/*
 * getStaticProps() is used to fetch data at build-time.
 *
 * On this page, it fetches data for the showcases to be linked to on this page
 *
 * This, in combination with getStaticPaths() below means this
 * page will be used to link to all showcases.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['showcase'],
      },
    },
  }
}
