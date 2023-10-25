// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { SignIn, ns as susiNs } from 'shared/components/susi/sign-in.mjs'

const ns = nsMerge(susiNs, pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const SignInPage = ({ page }) => {
  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-lg w-full">
          <SignIn />
        </div>
      </div>
    </PageWrapper>
  )
}

export default SignInPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['signin'],
      },
    },
  }
}
