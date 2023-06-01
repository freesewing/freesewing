import { siteConfig } from 'site/site.config.mjs'
import yaml from 'js-yaml'
// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useBugsnag } from 'site/hooks/use-bugsnag.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { ChoiceButton } from 'shared/components/choice-button.mjs'
import { CopyToClipboard } from 'shared/components/copy-to-clipboard.mjs'
import { WebLink } from 'shared/components/web-link.mjs'
import { Spinner } from 'shared/components/spinner.mjs'

export const ns = ['errors']

const ReportId = ({ id, t }) => (
  <>
    <p>{t('leadId')}:</p>
    <div className="bg-primary rounded-lg border border-primary border-solid bg-opacity-10">
      <div
        className={`
        flex flex-row justify-between items-center
        text-sm font-medium text-primary
        p-4
      `}
      >
        <span>{id}</span>
        <CopyToClipboard content={id} />
      </div>
    </div>
  </>
)

const userInfo = (account) => `
## About the user

This report was submitted by <a href="https://freesewing.org/users/${account.id}">FreeSewing user #${account.id}</a>
with username **${account.username}**.`

const patronInfo = (account) =>
  account.patron
    ? `
## :purple_heart: This was reported by a FreeSewing patron

> Please prioritize this issue as well as other issues by patrons as they are.

`
    : `

## :snail: This was not reported by a FreeSewing patron

> With limited time and resources available, please prioritize issues from patrons instead.

`

const issueTemplate = ({ isPublic, account, data, bug = { id: 'unknown', url: '#' } }) => `
${patronInfo(account)}

- **Site**: ${siteConfig.site}
- **Public report**: ${isPublic ? 'Yes' : 'No'}
- **Bugsnag Context ID**: [${bug.id}](${bug.url})

Please refer to [the Bugsnag report](${bug.url}) for in-depth data and stack trace.
However, please note that this is not publicly available.

${isPublic ? userInfo(account) : ''}

## Data included in this issue

\`\`\`yaml
${yaml.dump(data)}
\`\`\`
`

const ModalSpinner = ({ t }) => (
  <ModalWrapper>
    <div className="w-full max-w-md text-center">
      <h2>{t('pleaseWait')}</h2>
      <Spinner className="w-24 h-24 text-secondary animate-spin m-auto" />
    </div>
  </ModalWrapper>
)

const ModalResult = ({ t, bug, issue, clearModal }) => (
  <ModalWrapper>
    <h2>{t('reportCreated')}</h2>
    <ReportId id={bug.id} t={t} />
    {issue ? (
      <>
        <p>{t('leadIssue')}</p>
        <WebLink href={issue.url} txt={`github.com/freesewing/freesewing/issues/${issue.nr}`} />
      </>
    ) : null}
    <p>
      <button className="btn btn-neutral mt-4" onClick={clearModal}>
        {t('close')}
      </button>
    </p>
  </ModalWrapper>
)

export const ModalProblemReport = ({ title, data }) => {
  // Hooks
  const { t } = useTranslation(ns)
  const reportError = useBugsnag()
  const { account } = useAccount()
  const backend = useBackend()

  // Context
  const { clearModal, setModal } = useContext(ModalContext)

  // Helper method to create an issue
  const createIssue = async ({ title, body, labels }) => {
    let result
    try {
      result = await backend.createIssue({ title, body, labels })
    } catch (err) {
      console.log(err)
    }

    if (result.success && result.data.issue)
      return { url: result.data.issue.html_url, nr: result.data.issue.number }

    return false
  }

  // Helper method for private error report
  const reportPrivate = async (evt) => {
    evt.stopPropagation()
    setModal(<ModalSpinner t={t} />)
    const error = new Error(`[private] ${title}`)
    const bug = await reportError(error, {
      ...data,
      private: true,
      public: false,
      patron: account.patron,
    })
    let issue = false
    if (account.patron) {
      const issueData = {
        title,
        body: issueTemplate({ isPublic: false, account, title, data, bug }),
        labels: ['problem-report', 'public-report', 'impacts-patron'],
      }
      issue = await createIssue(issueData)
    }
    setModal(<ModalResult {...{ bug, issue, t, clearModal }} />)
  }

  // Helper method for public error report
  const reportPublic = async (evt) => {
    evt.stopPropagation()
    setModal(<ModalSpinner t={t} />)
    const error = new Error(`[public] ${title}`)
    const bug = await reportError(error, {
      ...data,
      private: false,
      public: true,
      patron: account.patron,
    })
    const issueData = {
      title,
      body: issueTemplate({ isPublic: true, account, title, data, bug }),
      labels: ['problem-report', 'public-report'],
    }
    if (account.patron) issueData.labels.push('impacts-patron')
    const issue = await createIssue(issueData)
    setModal(<ModalResult {...{ bug, issue, t, clearModal }} />)
  }

  return (
    <ModalWrapper>
      <div className="grid gap-2 p-4 grid-cols-1 max-w-lg w-full">
        <h2>{t('errors:newReport')}</h2>
        <ChoiceButton title={t('privateReport.t')} onClick={reportPrivate}>
          <p>{t('privateReport.d')}</p>
        </ChoiceButton>
        <ChoiceButton title={t('publicReport.t')} onClick={reportPublic}>
          <p>{t('publicReport.d')}</p>
        </ChoiceButton>
        <button className="btn btn-neutral mt-4" onClick={clearModal}>
          {t('cancel')}
        </button>
      </div>
    </ModalWrapper>
  )
}
