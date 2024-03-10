import { useState, useEffect } from 'react'
import { siteConfig } from 'site/site.config.mjs'
import { nsMerge } from 'shared/utils.mjs'
import {
  UserIcon,
  FlagIcon,
  ChatIcon,
  BoolYesIcon,
  WarningIcon,
  DownIcon,
} from 'shared/components/icons.mjs'
import { TimeAgo, ns as timeAgoNs } from 'shared/components/timeago/index.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import { WebLink } from 'shared/components/link.mjs'
import { useTranslation } from 'next-i18next'
import { Spinner } from 'shared/components/spinner.mjs'

export const ns = nsMerge('support', timeAgoNs)

/*
 * GitHub GraphQL queries must be properly quoted and can't handle newlines
 */
const query = {
  open:
    'query { ' +
    'repository(owner: "freesewing", name: "freesewing") { ' +
    '  issues(states: OPEN, labels: ["statusReported", "statusConfirmed"], first: 20) { ' +
    '    nodes { ' +
    '      title body createdAt url number updatedAt ' +
    '      author { login url } ' +
    '      labels (first: 5) { edges { node { name } } } ' +
    '      comments(last: 3) { edges { node { body createdAt url author { login url } } } } ' +
    '      timelineItems(last: 15, itemTypes:[ ISSUE_COMMENT, CLOSED_EVENT,ASSIGNED_EVENT,REOPENED_EVENT, REFERENCED_EVENT]) { edges { node { ' +
    '        __typename ' +
    '        ... on ClosedEvent { createdAt actor { url login } } ' +
    '        ... on ReopenedEvent { createdAt actor { url login } } ' +
    '        ... on ReferencedEvent { createdAt actor { url login } commit { url oid message } } ' +
    '        ... on IssueComment { createdAt body url author { url login } } ' +
    '        ... on AssignedEvent { createdAt actor { url login } assignee { ... on User { login url } } } ' +
    '      } } } ' +
    ' } } } } ',
  closed:
    'query { ' +
    'repository(owner: "freesewing", name: "freesewing") { ' +
    '  issues(states: CLOSED, labels: ["statusResolved"], first: 20) { ' +
    '    nodes { ' +
    '      title body url number createdAt closedAt ' +
    '      author { login url } ' +
    '      comments(last: 3) { edges { node { body createdAt url author { login url } } } } ' +
    '      timelineItems(last: 15, itemTypes:[ ISSUE_COMMENT, CLOSED_EVENT,ASSIGNED_EVENT,REOPENED_EVENT, REFERENCED_EVENT]) { edges { node { ' +
    '        __typename ' +
    '        ... on ClosedEvent { createdAt actor { url login } } ' +
    '        ... on ReopenedEvent { createdAt actor { url login } } ' +
    '        ... on ReferencedEvent { createdAt actor { url login } commit { url oid message } } ' +
    '        ... on IssueComment { createdAt body url author { url login } } ' +
    '        ... on AssignedEvent { createdAt actor { url login } assignee { ... on User { login url } } } ' +
    '      } } } ' +
    ' } } } } ',
}

/*
 * Helper method
 * Runs a GraphQL query and returns the result as JSON
 */
const runQuery = async (query) => {
  let result
  try {
    result = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${siteConfig.issueToken}`,
      },
      body: JSON.stringify({ query }),
    })
  } catch (err) {
    console.log(err)
    return false
  }
  const data = await result.json()

  return data
}

/*
 * Helper method to filter out GraphQL nodes based on a label set on them
 */
const filterOnLabel = (nodes, label) =>
  nodes.filter((node) =>
    node.labels.edges.filter((edge) => edge.node.name === label).length > 0 ? true : false
  )

/*
 * Method that load status issues from GitHub and
 * sets the result with the setter method passed to it.
 *
 * If issues are found, this will create and object
 * with reported, confirmed, and resolved as keys and
 * the list of issues as value of those keys.
 */
const loadStatusIssues = async (setIssues) => {
  const open = await runQuery(query.open)
  const closed = await runQuery(query.closed)

  const now = Date.now()
  setIssues({
    reported: filterOnLabel(open.data.repository.issues.nodes, 'statusReported'),
    confirmed: filterOnLabel(open.data.repository.issues.nodes, 'statusConfirmed'),
    resolved: closed.data.repository.issues.nodes.filter((node) => {
      const closed = new Date(node.closedAt).valueOf()
      // Only show what was closed in the last 36 hours
      return now - closed < 36 * 60 * 60 * 1000
    }),
  })
}

const AssignedEvent = ({ evt, t }) => (
  <div className="my-2 pb-2 rounded shadow p-2">
    <div className="text-sm opacity-70 italic flex flex-row items-center gap-1">
      <UserIcon className="w-6 h-6 text-primary" />
      <span className="pl-2">{t('support:issueAssigned')}</span>
      <TimeAgo date={evt.node.createdAt} />
      <span> {t('support:to')}</span>
      <WebLink href={evt.node.assignee.url} txt={evt.node.assignee.login} />
      <span>
        (<span>{t('support:by')} </span>
        <WebLink href={evt.node.actor.url} txt={evt.node.actor.login} />)
      </span>
    </div>
  </div>
)

const ClosedEvent = ({ evt, t }) => (
  <div className="my-2 pb-2 rounded shadow p-2">
    <div className="text-sm opacity-70 italic flex flex-row items-center gap-1">
      <BoolYesIcon />
      <span className="pl-2">{t('support:issueClosed')} </span>
      <TimeAgo date={evt.node.createdAt} />
      <span> {t('support:by')} </span>
      <WebLink href={evt.node.actor.url} txt={evt.node.actor.login} />
    </div>
  </div>
)

const ReopenedEvent = ({ evt, t }) => (
  <div className="my-2 pb-2 rounded shadow p-2">
    <div className="text-sm opacity-70 italic flex flex-row items-center gap-1">
      <WarningIcon className="h-6 w-6 text-warning" />
      <span className="pl-2">{t('support:issueReopened')} </span>
      <TimeAgo date={evt.node.createdAt} />
      <span> {t('support:by')} </span>
      <WebLink href={evt.node.actor.url} txt={evt.node.actor.login} />
    </div>
  </div>
)

const IssueComment = ({ evt, t }) => (
  <div className="my-2 pb-2 rounded shadow p-2">
    <div className="text-sm opacity-70 italic flex flex-row items-center gap-1">
      <ChatIcon className="h-6 w-6 text-secondary" />
      <span>{t('support:commentAdded')}</span>
      <WebLink href={evt.node.url} txt={<TimeAgo date={evt.node.createdAt} />} />
      <span> {t('support:by')}</span>
      <WebLink href={evt.node.author.url} txt={evt.node.author.login} />
    </div>
    <Mdx md={evt.node.body} />
  </div>
)

const ReferencedEvent = ({ evt, t }) => (
  <div className="my-2 pb-2 rounded shadow p-2">
    <div className="text-sm opacity-70 italic flex flex-row items-center gap-1">
      <FlagIcon className="h-6 w-6 text-accent" />
      <span>{t('support:issueReferenced')} </span>
      <WebLink href={evt.node.url} txt={<TimeAgo date={evt.node.createdAt} />} />
      <span> {t('support:by')} </span>
      <WebLink href={evt.node.actor.url} txt={evt.node.actor.login} />
      <span> {t('support:in')} </span>
      <WebLink href={evt.node.commit.url} txt={evt.node.commit.oid.slice(0, 8)} />
    </div>
    <Mdx md={evt.node.commit.message} />
  </div>
)

const events = {
  IssueComment,
  AssignedEvent,
  ReferencedEvent,
  ReopenedEvent,
  ClosedEvent,
}

const Null = () => null

const Event = (props) => {
  if (!props.evt.node) return null

  const Component = events[props.evt.node.__typename] || Null

  return <Component {...props} />
}

const Issue = ({ issue, t }) => {
  const [detail, setDetail] = useState(false)
  const btnClasses =
    'w-full my-1 rounded hover:bg-opacity-10 hover:bg-secondary text-left text-base-content p-1 px-2 flex flex-row items-center justify-between'

  if (!detail)
    return (
      <button onClick={() => setDetail(true)} className={`${btnClasses} border-l-4`}>
        <div>
          {issue.title}
          <small className="pl-2 opacity-70">[{issue.number}]</small>
          {issue.timelineItems.edges.length > 0 ? (
            <div className="badge badge-accent ml-2">
              {issue.timelineItems.edges.length} {t('support:updates')}
            </div>
          ) : null}
        </div>
        <DownIcon />
      </button>
    )

  return (
    <div className="shadow rounded mb-2 pb-2">
      <button
        onClick={() => setDetail(false)}
        className={`${btnClasses} border-b-2 bg-opacity-10 bg-secondary rounded-b-none`}
      >
        <h5>{issue.title}</h5>
        <DownIcon className="w-8 h-8 text-secondary rotate-180" stroke={3} />
      </button>
      <div className="px-4">
        <div className="text-sm opacity-70 italic">
          {t('support:reported')}{' '}
          <WebLink href={issue.url} txt={<TimeAgo date={issue.createdAt} />} />
          <span> {t('support:by')} </span>
          <WebLink href={issue.author.url} txt={issue.author.login} />
        </div>
        <Mdx md={issue.body} />
        {issue.timelineItems.edges.length > 0 ? (
          <>
            <h5>
              {t('support:updates')}
              <div className="badge badge-accent badge-sm -translate-y-2">
                {issue.timelineItems.edges.length}
              </div>
            </h5>
            {issue.timelineItems.edges.map((evt, i) => (
              <Event evt={evt} t={t} key={i} />
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

const Issues = ({ issues, t }) => (
  <div className="lg:ml-8">
    {issues.map((issue) => (
      <Issue key={issue.url} issue={issue} t={t} />
    ))}
  </div>
)

export const Status = () => {
  const { t } = useTranslation(ns)
  /*
   * null: We are (still) loading issues
   * Object: Object with 'reported', 'confirmed' and 'resolved' keys each holding an array of issues
   */
  const [issues, setIssues] = useState(null)

  useEffect(() => {
    if (issues === null) loadStatusIssues(setIssues)
  }, [issues])

  return (
    <>
      {issues === null ? (
        <Spinner />
      ) : [...issues.reported, ...issues.confirmed].length < 1 ? (
        <>
          <span className="opacity-80 font-light text-sm pl-1">{t('support:status')}</span>
          <h6 className="flex flex-row gap-2 items-center bg-success p-2 px-4 rounded-lg bg-opacity-30 border border-success mb-4">
            <BoolYesIcon className="w-6 h-6 text-warning" />
            {t('support:allOk')}
          </h6>
        </>
      ) : (
        <>
          <h2>{t('support:status')}</h2>
          {issues.reported.length > 0 ? (
            <>
              <h6 className="flex flex-row gap-2 items-center">
                <BoolYesIcon className="w-6 h-6 text-warning" />
                {t('support:reportedIssues')}
              </h6>
              <Issues issues={issues.reported} t={t} />
            </>
          ) : (
            <h6 className="flex flex-row gap-2 items-center opacity-50">
              <BoolYesIcon className="w-6 h-6 text-success" /> {t('support:noReportedIssues')}
            </h6>
          )}
          {issues.confirmed.length > 0 ? (
            <>
              <h6 className="flex flex-row gap-2 items-center">
                <WarningIcon className="w-6 h-6 text-warning" />
                {t('support:confirmedIssues')}
              </h6>
              <Issues issues={issues.confirmed} t={t} />
            </>
          ) : (
            <h6 className="flex flex-row gap-2 items-center opacity-50">
              <BoolYesIcon className="w-6 h-6 text-success" /> {t('support:noConfirmedIssues')}
            </h6>
          )}
        </>
      )}
      {issues && issues.resolved.length > 0 ? (
        <>
          <h6 className="flex flex-row gap-2 items-center">
            <BoolYesIcon className="w-6 h-6 text-success" />
            {t('support:recentlyResolvedIssues')}
          </h6>
          <Issues issues={issues.resolved} t={t} />
        </>
      ) : null}
    </>
  )
}
