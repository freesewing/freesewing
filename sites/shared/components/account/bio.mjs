// Dependencies
import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import Markdown from 'react-markdown'
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'

export const ns = ['account', 'toast']

export const Tab = ({ id, activeTab, setActiveTab, t }) => (
  <button
    className={`text-xl font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {t(id)}
  </button>
)

export const BioSettings = ({ title = false, welcome = false }) => {
  // Context
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation(ns)
  const toast = useToast()

  // State
  const [bio, setBio] = useState(account.bio)
  const [activeTab, setActiveTab] = useState('edit')

  // Helper method to save bio
  const save = async () => {
    startLoading()
    const result = await backend.updateAccount({ bio })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account.control].length > 5
      ? '/welcome/' + welcomeSteps[account.control][6]
      : '/docs/guide'

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  return (
    <div className="max-w-xl xl:pl-4">
      {title ? <h1 className="text-4xl">{t('bioTitle')}</h1> : null}
      <div className="tabs w-full">
        <Tab id="edit" {...tabProps} />
        <Tab id="preview" {...tabProps} />
      </div>
      <div className="flex flex-row items-center mt-4">
        {activeTab === 'edit' ? (
          <textarea
            rows="5"
            className="textarea textarea-bordered textarea-lg w-full"
            placeholder={t('placeholder')}
            onChange={(evt) => setBio(evt.target.value)}
            value={bio}
          />
        ) : (
          <div className="text-left px-4 border w-full">
            <Markdown>{bio}</Markdown>
          </div>
        )}
      </div>
      <SaveSettingsButton btnProps={{ onClick: save }} welcome={welcome} />
      {!welcome && <BackToAccountButton loading={loading} />}
      <Popout tip compact>
        {t('mdSupport')}
      </Popout>

      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={600 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                6 / {welcomeSteps[account.control].length}
              </span>
              <Icons
                done={welcomeSteps[account.control].slice(0, 5)}
                todo={welcomeSteps[account.control].slice(6)}
                current="bio"
              />
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
