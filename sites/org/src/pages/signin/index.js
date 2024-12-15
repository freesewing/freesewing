import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { NoTitleLayout } from '@freesewing/react/components/Layout'
import { SignIn } from '@freesewing/react/components/SignIn'
import { useHistory } from 'react-router-dom'

/*
 * This is the sign in page. Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function SignInPage() {
  const history = useHistory()

  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={NoTitleLayout}
      title="Sign In"
      description="Sign In to your FreeSewing account to unlock all features"
    >
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-lg w-full">
          <SignIn />
        </div>
      </div>
    </DocusaurusPage>
  )
}
