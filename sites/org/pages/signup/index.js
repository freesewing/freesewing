import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Popout from 'shared/components/popout.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import Link from 'next/link'
import { useState } from 'react'
import { validateEmail, validateTld } from 'shared/utils.mjs'
import SusiWrapper from 'site/components/wrappers/susi.js'
import { signUp } from 'shared/backend.mjs'

const DarkLink = ({ href, txt }) => (
  <Link className="decoration-1 underline text-medium font-medium hover:decoration-2" href={href}>
    {txt}
  </Link>
)

const SignUpPage = () => {
  const app = useApp()
  const { t } = useTranslation(['susi'])

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)

  const updateEmail = (evt) => {
    const value = evt.target.value
    setEmail(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid === true ? true : false)
  }

  const signupHandler = async (evt) => {
    evt.preventDefault()
    if (emailValid)
      await signUp({
        email,
        language: app.locale,
        ...app.loadHelpers,
      })
  }

  return (
    <Page app={app} title={t('joinFreeSewing')} layout={Layout} footer={false}>
      <SusiWrapper theme={app.theme}>
        <h1 className="text-neutral-content font-light text-3xl mb-0 pb-0">
          {t('joinFreeSewing')}!
        </h1>
        <p className="text-neutral-content">{t('toReceiveSignupLink')}:</p>
        <form onSubmit={signupHandler}>
          <input
            type="email"
            name="email"
            onChange={updateEmail}
            placeholder={t('emailAddress')}
            className="input input-bordered w-full text-base-content"
            autoFocus={true}
            value={email}
          />
          <button
            type="submit"
            style={{
              backgroundColor: emailValid ? '' : 'hsl(var(--wa) / var(--tw-border-opacity))',
              opacity: emailValid ? 1 : 0.8,
            }}
            className={`btn mt-4 capitalize w-full
              ${emailValid ? 'btn-primary' : 'btn-warning'}`}
            tabIndex="-1"
            role="button"
            aria-disabled={!emailValid}
          >
            {emailValid ? (
              <span>{t('emailSignupLink')}</span>
            ) : (
              <span className="textwarning-content">{t('pleaseProvideValidEmail')}</span>
            )}
          </button>
        </form>
        <p className="text-neutral-content text-sm mt-4 opacity-80 text-center">
          {t('alreadyHaveAnAccount')} <DarkLink href="/signin" txt={t('signInHere')} />
        </p>
      </SusiWrapper>
    </Page>
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
