// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Verification methods
import { validateEmail, validateTld } from 'site/utils.mjs'
// Components
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

export const ns = ['account']

const Tab = ({ id, activeTab, setActiveTab, t }) => (
  <button
    className={`text-xl font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {t(id)}
  </button>
)

export const EmailSettings = ({ app }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [email, setEmail] = useState(app.account.email)
  const [sent, setSent] = useState(false)

  const save = async () => {
    const result = await backend.updateAccount({ email })
    if (result) toast.for.settingsSaved()
    else toast.for.backendError()
  }

  const valid = (validateEmail(email) && validateTld(email)) || false

  return (
    <>
      <div className="flex flex-row items-center mt-4">
        <input
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          className="input w-full input-bordered flex flex-row"
          type="text"
        />
      </div>
      {sent ? (
        <Popout note>
          <h5>Email changes require confirmation</h5>
          <p>
            When you change your email address here, we will sent a confirmation email to the new
            email address.
          </p>
        </Popout>
      ) : (
        <button className="btn mt-4 btn-primary w-full" onClick={save} disabled={!valid}>
          {t('save')}
        </button>
      )}
      <BackToAccountButton loading={app.loading} />
    </>
  )
}
