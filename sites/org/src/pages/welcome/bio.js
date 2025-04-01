import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Bio } from '@freesewing/react/components/Account'

export default function WelcomeBioPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8 tw-w-full">
        <h1>Bio</h1>
        <p>Feel free to shamelessly plug your YouTube channel or link to other places.</p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Bio welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
