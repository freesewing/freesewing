//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { freeSewingConfig as config } from 'shared/config/freesewing.config.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useState, Fragment, useContext } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import {
  HeartIcon,
  ChatIcon,
  BugIcon,
  SettingsIcon,
  DocsIcon,
  LockIcon,
  KeyIcon,
  DesignIcon,
  HelpIcon,
  LeftIcon,
} from 'shared/components/icons.mjs'
import {
  ActiveImageInput,
  ButtonFrame,
  DesignDropdown,
  StringInput,
  MarkdownInput,
} from 'shared/components/inputs.mjs'
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { CodeBox } from 'shared/components/code-box.mjs'
import { WebLink } from 'shared/components/link.mjs'

// Translation namespaces used on this page
export const ns = ['support', 'designs', 'account', 'status']

const types = [
  'bugReport',
  'designIssue',
  'accountIssue',
  'docsUpdate',
  'question',
  'featureRequest',
  'security',
  'patronSponsor',
  'other',
]

export const userCard = (id) =>
  `[![User ${id}](${config.backend}/users/${id}/card)](https://freesewing.org/users/user?id=${id})`

const templates = {
  bugReport: {
    title: ({ title }) => `[bug]: ${title}`,
    labels: () => [':bug: bug'],
  },
  designIssue: {
    title: ({ title, design }) => `[${design}]: ${title}`,
    labels: ({ design }) => [`:shirt: ${design}`],
  },
  accountIssue: {
    title: ({ title }) => `[accounts]: ${title}`,
    labels: () => ['account'],
  },
  docsUpdate: {
    title: ({ title }) => `[docs]: ${title}`,
    labels: () => [':book: documentation'],
  },
  question: {
    title: ({ title }) => title,
    labels: () => [],
  },
  featureRequest: {
    title: ({ title }) => `[featureRequest]: ${title}`,
    labels: () => [':gem: enhancement'],
  },
  security: {
    title: ({ title }) => `[security]: ${title}`,
    labels: () => ['security'],
  },
  patronSponsor: {
    title: ({ title }) => `[patrons]: ${title}`,
    labels: () => ['impacts-patron'],
  },
  other: {
    title: ({ title }) => `[other]: ${title}`,
    labels: () => [],
  },
}

const commonLabels = [':robot: robot', 'needs-triage']

const iconProps = { className: 'w-8 h-8 shrink-0' }
const icons = {
  bugReport: <BugIcon {...iconProps} />,
  featureRequest: <SettingsIcon {...iconProps} />,
  docsUpdate: <DocsIcon {...iconProps} />,
  security: <LockIcon className="w-8 h-8 shrink-0 text-warning" />,
  question: <ChatIcon {...iconProps} />,
  other: <HelpIcon {...iconProps} />,
  accountIssue: <KeyIcon {...iconProps} />,
  designIssue: <DesignIcon {...iconProps} />,
  patronSponsor: <HeartIcon className="w-8 h-8 shrink-0 text-error" fill />,
}

const SupportType = ({ type, active, t, update }) => (
  <ButtonFrame key={type} active={active} onClick={() => update(type)}>
    <div className="w-full flex flex-col gap-2">
      <div className="w-full text-lg leading-5 flex flex-row items-center justify-between grow-0">
        <span>{t(`support:${type}`)}</span>
        {icons[type]}
      </div>
      <div className="w-full text-normal font-normal normal-case pt-1 leading-5 grow">
        {t(`support:${type}Desc`)}
      </div>
    </div>
  </ButtonFrame>
)

export const SupportForm = () => {
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { account } = useAccount()
  const backend = useBackend()

  const [type, setType] = useState(false)
  const [title, setTitle] = useState('')
  const [design, setDesign] = useState('')
  const [body, setBody] = useState('')
  const [images, setImages] = useState({})
  const [issue, setIssue] = useState(false)
  const [discussion, setDiscussion] = useState(false)

  const addImage = () => {
    const id = Object.keys(images).length + 1
    const newImages = { ...images }
    newImages[id] = null
    setImages(newImages)
  }

  const setSingleImage = (id, img) => {
    const newImages = { ...images }
    newImages[id] = img
    setImages(newImages)
  }

  const clear = () => {
    setIssue(false)
    setDiscussion(false)
    setType(false)
    setTitle('')
    setDesign('')
    setBody('')
    setImages({})
  }

  const submit = async () => {
    setLoadingStatus([true, 'gatheringInfo'])
    const templateData = { title, design }
    const issueData = {
      title: templates[type].title(templateData),
      body: `${body}\n\n${userCard(account.id || false)}`,
      labels: [...commonLabels, ...templates[type].labels(templateData)],
    }
    setLoadingStatus([true, 'submittingData'])
    const result =
      type === 'question'
        ? await backend.createDiscussion(issueData)
        : await backend.createIssue(issueData)
    if (result.success) {
      setLoadingStatus([true, 'settingsSaved', true, true])
      if (type === 'question')
        setDiscussion(result.data.discussion.data.createDiscussion.discussion.url)
      else setIssue(result.data.issue)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  if (issue || discussion)
    return (
      <div className="w-full max-w-xl">
        <h5>{t('support:requestCreated')}</h5>
        <p>
          We have created your request, you can find it here:
          <br />
          <WebLink
            href={discussion ? discussion : issue.html_url}
            txt={discussion ? discussion : issue.html_url}
          />
        </p>
        <button className="btn btn-secondary" onClick={clear}>
          <LeftIcon />
          {t('support:back')}
        </button>
      </div>
    )

  if (!type)
    return (
      <>
        <div className="grid grid-cols-3 gap-2">
          {types.map((_type) => (
            <SupportType type={_type} active={type === _type} update={setType} t={t} key={_type} />
          ))}
        </div>
        <p className="text-right">
          <WebLink
            txt={t('support:useGitHubInstead')}
            href="https://github.com/freesewing/freesewing/issues/new/choose"
          />
        </p>
      </>
    )

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SupportType type={type} active={true} update={() => setType(false)} t={t} />
      <StringInput
        id="support-title"
        label={t('support:title')}
        update={setTitle}
        current={title}
        valid={(val) => val.length > 10}
        docs={
          <div className="max-w-prose">
            <h2>{t('support:title')}</h2>
            <p>{t('support:titleDocs1')}</p>
            <p>{t('support:titleDocs2')}</p>
          </div>
        }
      />
      {type === 'designIssue' && (
        <DesignDropdown
          firstOption={<option val="">Not related to a design</option>}
          label={t('design')}
          update={setDesign}
          current={design}
          valid={(val) => val.length > 1}
          docs={
            <div className="max-w-prose">
              <h2>{t('design')}</h2>
              <p>{t('support:designDocs1')}</p>
            </div>
          }
        />
      )}
      <MarkdownInput
        id="support-body"
        label={t('support:description')}
        update={setBody}
        current={body}
        valid={(val) => val.length > 10}
        docs={
          <div className="max-w-prose">
            <h2>{t('support:description')}</h2>
            <p>{t('support:descriptionDocs1')}</p>
          </div>
        }
      />

      {Object.keys(images).map((key) => {
        const markup =
          '![Uploaded image](' + cloudflareImageUrl({ id: images[key], variant: 'public' }) + ')'
        return (
          <Fragment key={key}>
            <ActiveImageInput
              id={`support-img-${key}`}
              label={`${t('support:image')} ${key}`}
              update={(val) => setSingleImage(key, val)}
              current={images[key]}
              valid={(val) => val.length > 1}
              docs={
                <div className="max-w-prose">
                  <h2>{t('support:image')}</h2>
                  <p>{t('support:imageDocs1')}</p>
                </div>
              }
              imgType="support"
              imgSubid={key}
              imgSlug={Date.now()}
            />
            {images[key] && (
              <Popout tip>
                <span>{t('support:addImageToMd')}:</span>
                <CodeBox code={markup} title="MarkDown" />
                <p className="text-right -mt-5">
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => setBody(body + '\n\n' + markup)}
                  >
                    {t('support:addToDescription')}
                  </button>
                </p>
              </Popout>
            )}
          </Fragment>
        )
      })}
      {Object.keys(images).length < 9 && (
        <button className="btn btn-secondary mt-2" onClick={addImage}>
          {t('support:addImage')}
        </button>
      )}
      <button
        className="btn btn-primary block btn-lg mx-auto mt-8"
        disabled={title.length < 10}
        onClick={submit}
      >
        {t('support:submitSupportRequest')}
      </button>
    </div>
  )
}
