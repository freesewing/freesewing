import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Compare } from '@freesewing/react/components/Account'

export default function WelcomeComparePage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8">
        <h1>Measurements Comparison</h1>
        <p>
          Comparing measurements can help us detect problems, but if it bums you out, we can forego
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
    </Layout>
  )
}
