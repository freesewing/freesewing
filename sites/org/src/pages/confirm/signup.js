import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { NoTitleLayout } from '@freesewing/react/components/Layout'
import { SignUpConfirmation } from '@freesewing/react/components/SignUp'

/*
 * This is the sign up confirmation page (via email).
 * Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function SignUpConfirmationPage() {
  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={NoTitleLayout}
      title="Sign Up"
      description="Activate your FreeSewing account"
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-text-base-content tw-px-4">
        <div className="tw-max-w-lg tw-w-full">
          <SignUpConfirmation onSuccess={() => (window.location.href = '/welcome')} silent />
        </div>
      </div>
    </DocusaurusPage>
  )
}
