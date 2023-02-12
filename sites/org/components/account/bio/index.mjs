// Hooks
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'site/hooks/useBackend.mjs'
import { useToast } from 'site/hooks/useToast.mjs'
// Components
import Link from 'next/link'
import Markdown from 'react-markdown'
import { Icons, welcomeSteps, BackToAccountButton } from '../shared.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'

export const ns = ['bio']

const Tab = ({ id, activeTab, setActiveTab, t }) => (
  <button
    className={`text-xl font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {t(id)}
  </button>
)

export const BioSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(ns)
  const toast = useToast()
  const [bio, setBio] = useState(app.account.bio)
  const [activeTab, setActiveTab] = useState('edit')

  const save = async () => {
    const result = await backend.updateAccount({ bio })
    if (result) toast.for.settingsSaved()
    else toast.for.backendError()
  }

  const nextHref =
    welcomeSteps[app.account.control].length > 5
      ? '/welcome/' + welcomeSteps[app.account.control][6]
      : '/docs/guide'

  const tabProps = { activeTab, setActiveTab, t }

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : null}
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
      <button
        className={`btn mt-4 ${welcome ? 'btn-secondary w-64' : 'btn-primary w-full'}`}
        onClick={save}
      >
        {t('save')}
      </button>
      {!welcome && <BackToAccountButton />}
      <Popout tip compact>
        {t('mdSupport')}
      </Popout>

      {welcome ? (
        <>
          <Link href={nextHref} className="btn btn-primary w-full mt-12">
            {t('continue')}
          </Link>
          {welcomeSteps[app.account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={600 / welcomeSteps[app.account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                6 / {welcomeSteps[app.account.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account.control].slice(0, 5)}
                todo={welcomeSteps[app.account.control].slice(6)}
                current="bio"
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}
