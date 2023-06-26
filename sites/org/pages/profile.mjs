// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
// Dependencies
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { BackToAccountButton } from 'shared/components/account/shared.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['account', ...authNs, ...pageNs])]

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
 */
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicAccountProfile = dynamic(
  () => import('shared/components/account/profile.mjs').then((mod) => mod.AccountProfile),
  { ssr: false }
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const ProfilePage = ({ page }) => {
  const { account } = useAccount()
  return (
    <PageWrapper {...page}>
      <DynamicAuthWrapper>
        <DynamicAccountProfile />
        <Popout link compact>
          <PageLink href={`/users/${account.username}`} txt={`/users/${account.username}`} />
        </Popout>
      </DynamicAuthWrapper>
      <BackToAccountButton />
    </PageWrapper>
  )
}

export default ProfilePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['profile'],
      },
    },
  }
}
