// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper } from 'shared/components/wrappers/page.mjs'
import { Search } from 'site/components/search.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

const ContactPage = ({ page }) => (
  <PageWrapper {...page}>
    <div className="max-w-prose">
      <Popout tip compact>
        The <PageLink href="/sitemap" txt="sitemap" /> can also be helpful to find things.
      </Popout>
      <Search />
    </div>
  </PageWrapper>
)

export default ContactPage

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en')),
      page: {
        path: ['search'],
      },
    },
  }
}
