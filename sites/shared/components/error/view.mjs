import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Robot } from 'shared/components/robot/index.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ErrorView = ({ children, inspectChildren }) => {
  const { t } = useTranslation(['errors'])
  const [share, setShare] = useState(false)

  return (
    <div className="max-w-4xl m-auto">
      <Popout warning>
        <div className="flex flex-row justify-between">
          <div>
            <h3>{t('errors:something')}</h3>
            {children}
          </div>
          <Robot pose="fail" />
        </div>
      </Popout>
      <Popout tip>
        <h3>Would you like to report this problem?</h3>
        <p>
          You can help us <strong>make FreeSewing better by reporting this problem</strong>.
        </p>
        <p>If you choose to report this:</p>
        <ul className="list-disc list-inside ml-4 text-xl">
          <li>
            We will compile a <strong>crash report</strong> that contains everything needed{' '}
            <strong>to recreate this problem</strong>
          </li>
          <li>
            We will include <strong>personal data</strong> such as your <strong>username</strong>,{' '}
            <strong>email address</strong> and <strong>measurements</strong>
          </li>
          <li>
            We will share this report and the data in it with{' '}
            <a
              className="text-primary font-bold"
              href="https://github.com/orgs/freesewing/teams/bughunters"
            >
              FreeSewing&apos;s bughunters team
            </a>{' '}
            who will investigate the problem on your behalf
          </li>
          <li>
            Your personal data will <strong>not be shared publicly</strong>
          </li>
        </ul>
        <div className="form-control">
          <label className="cursor-pointer flex flex-row gap-4 my-4">
            <input
              type="checkbox"
              checked={share}
              className="checkbox checkbox-primary"
              onChange={() => setShare(!share)}
            />
            <span className="label-text text-xl">
              I agree to the use of my personal data for the purposes outlined above
            </span>
          </label>
        </div>
        <p>
          <button disabled={!share} className="btn btn-primary">
            Report this
          </button>
        </p>
        <p>
          If you prefer not to share any info, or want to investigate the problem yourself, you can
          do so:
        </p>
        {inspectChildren}
      </Popout>
    </div>
  )
}
