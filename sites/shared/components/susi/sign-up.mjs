// Hooks
import { useState, useContext } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Dependencies
import { validateEmail, validateTld } from 'shared/utils.mjs'
// Components
import Link from 'next/link'
import { Robot } from 'shared/components/robot/index.mjs'
import { EmailValidButton } from 'shared/components/buttons/email-valid-button.mjs'
import { LeftIcon, HelpIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

// Translation namespaces used on this page
const namespaces = ['signup', 'errors']

const DarkLink = ({ href, txt }) => (
  <Link className="decoration-1 underline text-medium font-medium hover:decoration-2" href={href}>
    {txt}
  </Link>
)

export const SignUp = () => {
  // Context
  const { setModal } = useContext(ModalContext)

  const backend = useBackend()
  const { t, i18n } = useTranslation(namespaces)

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateEmail = (evt) => {
    const value = evt.target.value
    setEmail(value)
    const valid = (validateEmail(value) && validateTld(value)) || false
    setEmailValid(valid === true ? true : false)
  }

  const signupHandler = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    if (!emailValid) return
    let res
    try {
      res = await backend.signUp({
        email,
        language: i18n.language,
        setResult,
      })
    } catch (err) {
      // Here to keep the stupid linter happy
      console.log(err)
    }
    if (res.data.result === 'created') setResult('success')
    else {
      setModal(
        <ModalWrapper bg="base-100 lg:bg-base-300">
          <div className="bg-base-100 rounded-lg p-4 lg:px-8 max-w-xl lg:shadow-lg">
            <h3>An error occured while trying to process your request</h3>
            <Robot pose="ohno" className="m-auto w-56" embed />
            <p className="text-lg">{t('err2')}</p>
            <p className="text-lg">{t('err3')}</p>
            <div className="flex flex-row gap-4 items-center justify-center p-8 flex-wrap">
              <button className="btn btn-primary px-8" onClick={() => setResult(false)}>
                <LeftIcon />
                <span className="pl-2">{t('back')}</span>
              </button>
              <Link href="/support" className="btn btn-primary btn-outline px-8">
                <HelpIcon />
                <span className="pl-2">{t('contact')}</span>
              </Link>
            </div>
          </div>
        </ModalWrapper>
      )
    }
    setLoading(false)
  }

  const loadingClasses = loading ? 'opacity-50' : ''

  return (
    <>
      <h2 className={`text-inherit ${loadingClasses}`}>
        {result ? (
          result === 'success' ? (
            <span>{t('emailSent')}!</span>
          ) : (
            <span>An error occured while trying to process your request</span>
          )
        ) : (
          <span>{t('signup:createAFreeSewingAccount')}</span>
        )}
      </h2>

      {result ? (
        result === 'success' ? (
          <>
            <p className="text-inherit text-lg">
              {t('checkYourInbox')} <b>FreeSewing.org</b>
            </p>
            <p className="text-inherit text-lg">{t('clickSignupLink')}</p>
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
            <Robot pose="ohno" className="m-auto w-56 text-inherit" embed />
            <p className="text-inherit text-lg">{t('err2')}</p>
            <p className="text-inherit text-lg">{t('err3')}</p>
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
          <p className={`text-inherit ${loadingClasses}`}>{t('toReceiveSignupLink')}:</p>
          <form onSubmit={signupHandler}>
            <input
              type="email"
              name="email"
              onChange={updateEmail}
              placeholder={t('emailAddress')}
              className={`input input-bordered w-full text-inherit ${loadingClasses}`}
              autoFocus={true}
              value={email}
            />
            <EmailValidButton
              email={email}
              t={t}
              validText={t('emailSignupLink')}
              invalidText={t('pleaseProvideValidEmail')}
              btnProps={{ type: 'submit' }}
            />
          </form>
          <p className={`text-inherit text-sm mt-4 opacity-80 text-center ${loadingClasses}`}>
            {t('alreadyHaveAnAccount')} <DarkLink href="/signin" txt={t('signInHere')} />
          </p>
        </>
      )}
    </>
  )
}
