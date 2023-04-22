// Hooks
import { useApp } from 'shared/hooks/use-app.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout.mjs'

// Translation namespaces used on this page
// Note that we include the account namespace here for the 'new' keyword
const namespaces = [...pageNs, 'account']

const AccountPage = (props) => {
  const app = useApp(props)

  return (
    <PageWrapper app={app}>
      <div className="max-w-lg">
        <Popout fixme>
          <h5>This needs an umbrella page</h5>
          <p>
            We need to create content here linking to all the <em>new something</em> pages
          </p>
        </Popout>
      </div>
    </PageWrapper>
  )
}

export default AccountPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        path: ['new'],
      },
    },
  }
}
