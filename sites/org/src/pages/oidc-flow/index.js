import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { BaseLayout, Layout, NoTitleLayout } from '@freesewing/react/components/Layout'
import { WarningIcon, FingerprintIcon, BoolYesIcon } from '@freesewing/react/components/Icon'
import { Popout } from '@freesewing/react/components/Popout'
import { linkClasses, getSearchParam } from '@freesewing/utils'
import { useEffect, useState } from 'react'
import { RoleBlock } from '@freesewing/react/components/Role'
import { MiniTip } from '@freesewing/react/components/Mini'
import Link from '@docusaurus/Link'
import { useAccount } from '@freesewing/react/hooks/useAccount'

/*
 * This is the OIDC flow sign in page.
 * Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function SignInPage() {
  const [uid, setUid] = useState('')
  const { token, account } = useAccount()

  useEffect(() => {
    const interaction = getSearchParam('uid')
    setUid(interaction || false)
  }, [])

  if (uid === false) return <InvalidUrlWarning />
  if (!uid) return <OneMomentPlease />

  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={BaseLayout}
      title="Sign in with FreeSewing"
      description="Sign In with your FreeSewing account"
    >
      <div className="tw-text-base-content tw-px-4 tw-max-w-2xl tw-mx-auto tw-py-12">
        <h1 className="tw-break-words tw-hidden">Sign in with FreeSewing</h1>
        <RoleBlock user>
          <div className="tw-border tw-rounded-lg tw-max-w-lg">
            <h5
              className={`tw-flex tw-flex-row tw-items-center tw-gap-2 tw-px-4 tw-bg-primary
            tw-rounded-t-lg tw-text-primary-content tw-justify-between`}
            >
              <span>Sign in with FreeSewing</span>
              <FingerprintIcon />
            </h5>
            <div className="tw-w-full tw-p-4">
              <h3 className="tw-text-center">
                <a href="https://forum.freesewing.eu/" title="forum.freesewing.eu">
                  forum.freesewing.eu
                </a>
                <br />
                <span className="tw-font-medium tw-text-xl">
                  wants to access your FreeSewing account
                </span>
              </h3>
              <table className="tw-table tw-mx-auto tw-border-0">
                <tbody>
                  {['Avatar', 'Bio', 'Email Address', 'User ID'].map((item) => (
                    <tr key={item} className="tw-bg-transparent tw-border-0">
                      <td className="tw-w-10 tw-border-0 tw-bg-transparent">
                        <BoolYesIcon />
                      </td>
                      <td className="tw-border-0 tw-font-bold">Your {item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form
                method="POST"
                action={`https://backend.freesewing.eu/interaction/${uid}/login`}
                className="tw-mb-4"
              >
                <input type="hidden" name="token" value={token} />
                <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-2">
                  <button
                    type="submit"
                    className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline"
                  >
                    Deny
                  </button>
                  <button type="submit" className="tw-daisy-btn tw-daisy-btn-primary">
                    Allow
                  </button>
                </div>
              </form>
              <MiniTip>
                You should only share your FreeSewing account data with sites you trust. In this
                case, as <b>forum.freesewing.eu</b> is an official FreeSewing site, there is no
                risk.
              </MiniTip>
            </div>
          </div>
        </RoleBlock>
      </div>
    </DocusaurusPage>
  )
}

const InvalidUrlWarning = () => (
  <DocusaurusPage
    DocusaurusLayout={DocusaurusLayout}
    Layout={Layout}
    title="Invalid OIDC Flow ID"
    description="Use your FreeSewing account to sign in to other services or sites"
  >
    <div className="tw-flex tw-flex-col tw-items-center tw-text-base-content tw-px-4">
      <div className="tw-w-full tw-py-4 tw-max-w-lg">
        <h2 className="tw-flex tw-flex-row tw-items-end tw-justify-between tw-gap-2 tw-flex-wrap tw-text-4xl">
          Nope
          <WarningIcon className="tw-w-10 tw-h-10 tw-text-error" />
        </h2>
        <p className="tw-mb-2">
          Attempting to climb aboard the OIDC flow midway is not a good idea.
        </p>
        <details>
          <summary className={linkClasses}>What does that mean?</summary>
          <Popout tip title="Why do I get this error about OIDC flow?">
            <p className="tw-mb-2">
              Your request lacks a valid interaction ID for the OpenID Connect (OIDC) flow. Such an
              interaction ID that is automatically generated by he FreeSewing backend prior to
              redirecting to this page.
            </p>
            <p className="tw-mb-2">
              In other words, this page only works if you were sent here by our backend with the
              proper paperwork.
            </p>
            <p className="tw-mb-2">
              If you are not certain how you ended up here in the first place, just navigate away.
              Try{' '}
              <Link href="/" className={linkClasses}>
                the home page
              </Link>{' '}
              if you are not certain what to do next.
            </p>
          </Popout>
        </details>
      </div>
    </div>
  </DocusaurusPage>
)

const OneMomentPlease = () => (
  <DocusaurusPage
    DocusaurusLayout={DocusaurusLayout}
    Layout={NoTitleLayout}
    title="One moment please"
    description="We are gathering all the required info"
  >
    <div className="tw-flex tw-flex-col tw-items-center tw-text-base-content tw-px-4">
      <div className="tw-max-w-xl tw-w-full tw-py-12">
        <h1>One moment please</h1>
        <p>This should not take long.</p>
      </div>
    </div>
  </DocusaurusPage>
)

function oidcLogin(body) {
  console.log({ body })
}
