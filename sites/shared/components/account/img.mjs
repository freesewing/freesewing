// Dependencies
import { cloudflareImageUrl } from 'shared/utils.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { PassiveImageInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'site/components/dynamic-org-docs.mjs'

export const ns = ['account', 'status']

export const ImgSettings = ({ welcome = false }) => {
  const { account, setAccount } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { t, i18n } = useTranslation(ns)

  const [img, setImg] = useState('')

  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ img })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const nextHref = '/docs/guide'

  return (
    <div className="max-w-xl">
      {!welcome || img !== false ? (
        <img
          alt="img"
          src={img || cloudflareImageUrl({ id: `user-${account.ihash}`, variant: 'public' })}
          className="shadow mb-4"
        />
      ) : null}
      <PassiveImageInput
        id="account-img"
        label={t('image')}
        placeholder={'image'}
        update={setImg}
        current={img}
        valid={(val) => val.length > 0}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/img`} />}
      />
      {welcome ? (
        <>
          <button className={`btn btn-secondary mt-4 px-8`} onClick={save} disabled={!img}>
            {t('save')}
          </button>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={700 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                7 / {welcomeSteps[account.control].length}
              </span>
              <Icons
                done={welcomeSteps[account.control].slice(0, 6)}
                todo={welcomeSteps[account.control].slice(7)}
                current="img"
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <SaveSettingsButton btnProps={{ onClick: save }} />
          <BackToAccountButton />
        </>
      )}
    </div>
  )
}
