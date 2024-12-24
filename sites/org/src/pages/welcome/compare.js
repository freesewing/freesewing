import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Compare } from '@freesewing/react/components/Account'

export default function WelcomeComparePage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tailwind-container">
        <div className="text-base-content mdx max-w-prose text-base-content max-w-prose text-current xl:pl-4 mx-auto my-8">
          <h1>Measurements Comparison</h1>
          <p>
            Comparing measurements can help us detect problems, but it bums you out, we can forego
            it.
            <br />
            <small>
              Regardless of what you pick, you are a beautiful person and nothing compares to you
              anyway
            </small>
          </p>
          <DocusaurusDoc>
            <RoleBlock user>
              <Compare welcome />
            </RoleBlock>
          </DocusaurusDoc>
        </div>
      </div>
    </Layout>
  )
}
