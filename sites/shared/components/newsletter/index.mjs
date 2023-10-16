// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Verification methods
import { validateEmail, validateTld } from 'shared/utils.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { EmailInput } from 'shared/components/inputs.mjs'
// Components
import { NewsletterSettings } from 'shared/components/account/newsletter.mjs'

export const ns = ['newsletter', 'account']

export const SubscribeToNewsletter = ({ hideWhenSubscribed = false }) => {
  const { t, i18n } = useTranslation(ns)
  const { language } = i18n
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { account } = useAccount()
  const backend = useBackend()

  // State
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const subscribe = async () => {
    setLoadingStatus([true, 'contactingBackend'])
    let result
    try {
      result = await backend.newsletterSubscribe({ email, language })
      if (result.success) {
        setSent(true)
        setLoadingStatus([true, 'nailedIt', true, true])
      } else setLoadingStatus([true, 'backendError', true, true])
    } catch (err) {
      setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Is email valid?
  const valid = (validateEmail(email) && validateTld(email)) || false

  if (account.newsletter && hideWhenSubscribed) return <p>note</p> //null

  if (account.username)
    return (
      <div>
        <p>{t('newsletter:subscribePitch')}</p>
        <NewsletterSettings bare />
      </div>
    )

  if (sent)
    return (
      <>
        <h4>{t('newsletter:almostThere')}</h4>
        <p>{t('newsletter:checkInbox', { email })}</p>
      </>
    )

  return (
    <div>
      <EmailInput
        id="nl-email"
        label={t('account:email')}
        placeholder={t('account:email')}
        update={setEmail}
        labelBL={t('emailTitle')}
        current={email}
        original={account.email}
        valid={() => valid}
      />
      <button className="btn mt-4 btn-primary w-full" onClick={subscribe} disabled={!valid}>
        {t('newsletter:subscribeToNewsletter')}
      </button>
    </div>
  )
}
