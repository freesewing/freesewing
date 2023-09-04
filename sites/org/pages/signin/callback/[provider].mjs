// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
//import { SignIn, ns as susiNs } from 'shared/components/susi/sign-in.mjs'
import { Loading } from 'shared/components/spinner.mjs'

const ns = nsMerge(pageNs)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const OauthCallbackPage = ({ page, provider }) => {
  const router = useRouter()
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setAccount, setToken, setSeenUser } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  useEffect(() => {
    const oauthFlow = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const state = urlParams.get('state')
      const code = urlParams.get('code')
      const result = await backend.oauthSignIn({ state, code, provider })
      if (result.data?.account && result.data?.token) {
        setAccount(result.data.account)
        setToken(result.data.token)
        setSeenUser(result.data.account.username)
        setLoadingStatus([
          true,
          t('susi:welcomeBackName', { name: result.data.account.username }),
          true,
          true,
        ])
        router.push('/welcome')
      } else setLoadingStatus([true, 'backendError', true, true])
    }
    oauthFlow()
  }, [provider])

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-lg w-full">
          <Loading />
        </div>
      </div>
    </PageWrapper>
  )
}

export default OauthCallbackPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      provider: params.provider,
      page: {
        locale,
        path: ['signin', 'callback', params.provider],
      },
    },
  }
}

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 *
 * To learn more, see: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticPaths() {
  return {
    paths: [`/signin/callback/github`, `/signin/callback/google`],
    fallback: false,
  }
}
