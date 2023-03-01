// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Verification methods
import { validateEmail, validateTld } from 'site/utils.mjs'
// Components
import { BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const ns = ['account', 'toast']

export const EmailSettings = ({ app, title = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [email, setEmail] = useState(app.account.email)
  const [changed, setChanged] = useState(false)

  const save = async () => {
    const result = await backend.updateAccount({ email })
    if (result) toast.for.settingsSaved()
    else toast.for.backendError()
    setChanged(true)
  }

  const valid = (validateEmail(email) && validateTld(email)) || false

  return (
    <>
      {title ? <h2 className="text-4xl">{t('emailTitle')}</h2> : null}
      {changed ? (
        <Popout note>
          <h3>{t('oneMoreThing')}</h3>
          <p>{t('emailChangeConfirmation')}</p>
        </Popout>
      ) : (
        <>
          <div className="flex flex-row items-center mt-4">
            <input
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="input w-full input-bordered flex flex-row"
              type="text"
            />
          </div>
          <button
            className="btn mt-4 btn-primary w-full"
            onClick={save}
            disabled={!valid || email.toLowerCase() === app.account.email}
          >
            {t('save')}
          </button>
        </>
      )}
      <BackToAccountButton loading={app.loading} />
    </>
  )
}
