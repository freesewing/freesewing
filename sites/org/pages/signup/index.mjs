// Hooks
import { useState } from 'react'
import { useApp } from 'site/hooks/useApp.mjs'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { validateEmail, validateTld } from 'site/utils.mjs'
// Components
import Link from 'next/link'
import { PageWrapper } from 'site/components/wrappers/page.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { SusiWrapper } from 'site/components/wrappers/susi.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { EmailValidButton } from 'site/components/buttons/email-valid-button.mjs'

// Translation namespaces used on this page
const namespaces = ['signup', 'errors']

const DarkLink = ({ href, txt }) => (
  <Link className="decoration-1 underline text-medium font-medium hover:decoration-2" href={href}>
    {txt}
  </Link>
)

const SignUpPage = (props) => {
  const app = useApp(props)
  const backend = useBackend(app)
  const { t } = useTranslation(namespaces)

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null)

  const updateEmail = (evt) => {
    const value = evt.target.value
    setEmail(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid === true ? true : false)
  }

  const signupHandler = async (evt) => {
    evt.preventDefault()
    if (!emailValid) return
    let res
    try {
      res = await backend.signUp({
        email,
        language: app.locale,
        setResult,
      })
    } catch (err) {
      setError(app.error(err))
      // Here to keep the stupid linter happy
      console.log(error)
    }
    if (res.result === 'success') setResult('success')
    else setResult('fail')
  }

  const loadingClasses = app.loading ? 'opacity-50' : ''

  return (
    <PageWrapper app={app} title={t('joinFreeSewing')} layout={BareLayout} footer={false}>
      <SusiWrapper theme={app.theme} error={result && result !== 'success'}>
        <h1 className={`text-neutral-content font-light text-3xl mb-0 pb-0 ${loadingClasses}`}>
          {result ? (
            result === 'success' ? (
              <span>{t('emailSent')}!</span>
            ) : (
              <span>An error occured while trying to process your request</span>
            )
          ) : (
            <span>{t('joinFreeSewing')}!</span>
          )}
        </h1>
        {result ? (
          result === 'success' ? (
            <>
              <p className="text-neutral-content text-lg">
                {t('checkYourInbox')} <b>FreeSewing.org</b>
              </p>
              <p className="text-neutral-content text-lg">{t('clickSignupLink')}</p>
              <div className="flex flex-row gap-4 items-center justify-center p-8">
                <button className="btn btn-ghost" onClick={() => setResult(false)}>
                  {t('back')}
                </button>
                <Link href="/support" className="btn btn-ghost">
                  {t('contact')}
                </Link>
              </div>
            </>
          ) : (
            <>
              <Robot pose="ohno" className="m-auto w-56 text-neutral-content" embed />
              <p className="text-neutral-content text-lg">{t('err2')}</p>
              <p className="text-neutral-content text-lg">{t('err3')}</p>
              <div className="flex flex-row gap-4 items-center justify-center p-8">
                <button className="btn btn-ghost" onClick={() => setResult(false)}>
                  {t('back')}
                </button>
                <Link href="/support" className="btn btn-ghost">
                  {t('contact')}
                </Link>
              </div>
            </>
          )
        ) : (
          <>
            <p className={`text-neutral-content ${loadingClasses}`}>{t('toReceiveSignupLink')}:</p>
            <form onSubmit={signupHandler}>
              <input
                type="email"
                name="email"
                onChange={updateEmail}
                placeholder={t('emailAddress')}
                className={`input input-bordered w-full text-base-content ${loadingClasses}`}
                autoFocus={true}
                value={email}
              />
              <EmailValidButton
                email={email}
                app={app}
                t={t}
                validText={t('emailSignupLink')}
                btnProps={{ type: 'submit' }}
              />
            </form>
            <p
              className={`text-neutral-content text-sm mt-4 opacity-80 text-center ${loadingClasses}`}
            >
              {t('alreadyHaveAnAccount')} <DarkLink href="/signin" txt={t('signInHere')} />
            </p>
          </>
        )}
      </SusiWrapper>
    </PageWrapper>
  )
}

export default SignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
