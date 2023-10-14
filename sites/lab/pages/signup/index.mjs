// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { SignUp, ns as susiNs } from 'shared/components/susi/sign-up.mjs'

// Translation namespaces used on this page
const ns = nsMerge(susiNs, pageNs)

const SignUpPage = ({ page }) => {
  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-2xl">
          <SignUp />
        </div>
      </div>
    </PageWrapper>
  )
}

export default SignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        path: ['signup'],
      },
    },
  }
}
