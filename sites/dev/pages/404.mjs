// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { BaseLayout, BaseLayoutLeft, BaseLayoutWide } from 'shared/components/base-layout.mjs'
import { NavLinks, MainSections } from 'shared/components/navigation/sitenav.mjs'

const namespaces = [...pageNs]

const Page404 = () => (
  <PageWrapper title="404: Page not found" intro="We could not find what you are looking for">
    <BaseLayout>
      <BaseLayoutLeft>
        <MainSections />
        <NavLinks />
      </BaseLayoutLeft>
      <BaseLayoutWide>
        <div className="max-w-2xl">
          <h1>404: Page not found</h1>
          <div className="max-w-sm m-auto px-12 mb-4">
            <Robot embed pose="fail" />
          </div>
          <h3>We could not find what you are looking for</h3>
          <div className="text-left">
            <Popout comment by="joost">
              <h5>Did you arrive here from a link?</h5>
              <p>In that case, that link is broken.</p>
              <p>
                If it was one of our links, please{' '}
                <PageLink href="/howtos/help" txt="let us know" /> so we can fix it.
              </p>
            </Popout>
          </div>
        </div>
      </BaseLayoutWide>
    </BaseLayout>
  </PageWrapper>
)

export default Page404

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en', namespaces)),
      page: {
        path: ['404'],
      },
    },
  }
}
