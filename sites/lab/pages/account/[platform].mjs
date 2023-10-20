// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, capitalize } from 'shared/utils.mjs'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
import { siteConfig } from 'site/site.config.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { ns as platformNs } from 'shared/components/account/platform.mjs'

// Translation namespaces used on this page
const ns = nsMerge(platformNs, authNs, pageNs)

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicPlatform = dynamic(
  () => import('shared/components/account/platform.mjs').then((mod) => mod.PlatformSettings),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const AccountPage = ({ page, platform }) => (
  <PageWrapper {...page} title={capitalize(platform)}>
    <DynamicAuthWrapper>
      <DynamicPlatform platform={platform} />
    </DynamicAuthWrapper>
  </PageWrapper>
)

export default AccountPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      platform: params.platform,
      page: {
        locale,
        path: ['account', params.platform],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * On this page, it is returning a truncated list of routes (think URLs) for all
 * the mdx blog (markdown) content.
 * That list comes from prebuild/blog-paths.mjs, which is built in the prebuild step
 * and contains paths, titles, imageUrls, and intro for all blog posts.
 *
 * the fallback: 'blocking' property means that
 * any pages that haven't been pre-generated
 * will generate and cache the first time someone visits them
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export const getStaticPaths = async () => {
  const paths = []
  for (const platform of Object.keys(freeSewingConfig.account.fields.identities).filter(
    (key) => key !== 'github'
  )) {
    for (const locale of siteConfig.languages) {
      paths.push({ params: { platform }, locale })
    }
  }

  return { paths, fallback: true }
}
