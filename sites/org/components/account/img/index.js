import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import useBackend from 'site/hooks/useBackend.js'
import Link from 'next/link'
import { Choice, Icons, welcomeSteps } from '../shared.js'

export const namespaces = ['img']

const Tab = ({ id, activeTab, setActiveTab, t }) => (
  <button
    className={`text-xl font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {t(id)}
  </button>
)

const UsernameSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(namespaces)
  const [bio, setBio] = useState(app.account.bio)

  const save = async () => {
    const result = await backend.updateAccount({ bio })
  }

  const nextHref = '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : null}
      <div className="flex flex-row items-center mt-4">fixme</div>
      <button className={`btn btn-secondary mt-4 w-64`} onClick={save}>
        {t('upload')}
      </button>

      {welcome ? (
        <>
          <Link href={nextHref} className="btn btn-primary w-full mt-12">
            {t('continue')}
          </Link>
          {welcomeSteps[app.account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={700 / welcomeSteps[app.account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                7 / {welcomeSteps[app.account.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account.control].slice(0, 6)}
                todo={welcomeSteps[app.account.control].slice(7)}
                current="img"
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default UsernameSettings
