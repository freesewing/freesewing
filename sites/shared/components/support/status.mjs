import { useState, useEffect } from 'react'
import { siteConfig } from 'site/site.config.mjs'
import { BoolYesIcon, WarningIcon, DownIcon } from 'shared/components/icons.mjs'
import { TimeAgo } from 'shared/components/timeago/index.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'

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
    '      author { login } ' +
    '      labels (first: 5) { edges { node { name } } } ' +
    '      comments(last: 3) { edges { node { body } } } ' +
    ' } } } } ',
  closed:
    'query { ' +
    'repository(owner: "freesewing", name: "freesewing") { ' +
    '  issues(states: CLOSED, labels: ["statusResolved"], first: 20) { ' +
    '    nodes { ' +
    '      title body url number createdAt closedAt ' +
    '      author { login } ' +
    '      comments(last: 3) { edges { node { body } } } ' +
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

  setIssues({
    reported: filterOnLabel(open.data.repository.issues.nodes, 'statusReported'),
    confirmed: filterOnLabel(open.data.repository.issues.nodes, 'statusConfirmed'),
    resolved: closed.data.repository.issues.nodes,
  })
}

const Issue = ({ issue, type }) => {
  const [detail, setDetail] = useState(false)
  const btnClasses =
    'bg-warning bg-opacity-10 w-full my-1 rounded hover:bg-opacity-20 text-left text-base-content p-1 px-4 flex flex-row items-center justify-between'

  if (!detail)
    return (
      <button onClick={() => setDetail(true)} className={btnClasses}>
        <span>
          #{issue.number}: {issue.title}
        </span>
        <DownIcon />
      </button>
    )

  return (
    <div className="shadow rounded">
      <button onClick={() => setDetail(false)} className={btnClasses}>
        <span>
          #{issue.number}: {issue.title}
        </span>
        <DownIcon />
      </button>
      <button
        onClick={() => setDetail(false)}
        className="bg-secondary bg-opacity-10 hover:bg-opacity-20 text-base-content"
      >
        close
      </button>
      <div className="text-sm opacity-70">
        Reported <TimeAgo date={issue.createdAt} /> by {issue.author.login}
      </div>
      <Mdx md={issue.body} />
      <div className="text-sm opacity-70">
        Last update: <TimeAgo date={issue.updatedAt} />
      </div>
      <pre>{JSON.stringify(issue, null, 2)}</pre>
    </div>
  )
}

const Issues = ({ issues }) => (
  <div>
    {issues.map((issue) => (
      <Issue key={issue.url} issue={issue} />
    ))}
  </div>
)

export const Status = () => {
  /*
   * null: We are (still) loading issues
   * false: No issues, everything is ok
   * Object: Object with 'reported', 'confirmed' and 'resolved' keys each holding an array of issues
   */
  const [issues, setIssues] = useState(null)

  useEffect(() => {
    if (issues === null) loadStatusIssues(setIssues)
  }, [issues])

  return (
    <>
      <h2>Status</h2>
      {issues === null ? (
        <p>Loading...</p>
      ) : issues === false ? (
        <p>Everything is fine</p>
      ) : (
        <>
          {issues.reported.length > 0 ? (
            <>
              <h4>
                Reported issues <span className="text-sm">(unconfirmed)</span>
              </h4>
              <Issues issues={issues.reported} />
            </>
          ) : (
            <h6 className="flex flex-row gap-2 items-center text-success">
              <BoolYesIcon /> No Reported issues
            </h6>
          )}
          {issues.confirmed.length > 0 ? (
            <>
              <h4 className="flex flex-row gap-2 items-center text-warning">
                <WarningIcon /> Confirmed issues <span className="text-sm">(ongoing)</span>
              </h4>
              {issues.confirmed.map((issue) => (
                <Issue key={issue.url} issue={issue} type="confirmed" />
              ))}
            </>
          ) : (
            <h6 className="flex flex-row gap-2 items-center text-success">
              <BoolYesIcon /> No Confirmed issues
            </h6>
          )}
          {issues.resolved.length > 0 ? (
            <>
              <h4 className="flex flex-row gap-2 items-center text-success">
                <BoolYesIcon /> Resolved issues <span className="text-sm">(recent)</span>
              </h4>
              {issues.resolved.map((issue) => (
                <Issue key={issue.url} issue={issue} type="resolved" />
              ))}
            </>
          ) : null}
        </>
      )}
    </>
  )
}
