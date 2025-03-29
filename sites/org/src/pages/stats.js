// Dependencies
import { linkClasses, formatNumber, orderBy, clone } from '@freesewing/utils'
// Hooks
import { useState, useEffect } from 'react'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { Spinner } from '@freesewing/react/components/Spinner'
import { ChartWrapper } from '@freesewing/react/components/Echart'

const meta = {
  title: 'FreeSewing by numbers',
  description: 'Some high-level numbers about Freesewing',
}

const option = {
  tooltip: {
    trigger: 'axis',
    show: true,
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  title: {
    left: 'center',
  },
  grid: {
    left: '40',
    right: '60',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      magicType: {
        type: ['line', 'bar'],
      },
    },
  },
  yAxis: {
    type: 'value',
  },
}

export default function StatsPage() {
  const [stats, setStats] = useState()
  const [error, setError] = useState(false)
  const backend = useBackend()

  useEffect(() => {
    getStats(backend, setStats, setError)
  }, [])

  if (!stats)
    return (
      <DocusaurusPage DocusaurusLayout={Layout} {...meta} Layout={false}>
        <div className="tw-text-center tw-mt-12 tw-w-full">
          <Spinner />
        </div>
      </DocusaurusPage>
    )

  const designTop = orderBy(
    Object.entries(stats.designs).map(([design, count]) => ({ design, count })),
    'count',
    'desc'
  ).slice(0, 50)

  const optionD = clone(option)
  optionD.title.text = 'Top 50 FreeSewing Designs'
  optionD.xAxis = {
    type: 'category',
    data: designTop.map((entry) => entry.design),
    name: 'Design',
  }
  optionD.series = [
    {
      data: designTop.map((entry) => entry.count),
      type: 'bar',
    },
  ]

  const optionU = clone(option)
  optionU.title.text = 'Top 25 FreeSewing Users'
  optionU.xAxis = {
    type: 'category',
    data: stats.topUsers.map((user) => user.username),
    name: 'User',
  }
  optionU.series = [
    {
      data: stats.topUsers.map((user) => user.calls),
      type: 'bar',
    },
  ]

  return (
    <DocusaurusPage DocusaurusLayout={Layout} {...meta}>
      <div className="tw-max-w-7xl tw-mx-auto tw-my-12 tw-px-4">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
          <Stat title="Users" value={stats.user} />
          <Stat title="Patterns" value={stats.pattern} />
          <Stat title="Measurements Sets" value={stats.set} />
          <Stat title="Curated Sets" value={stats.curatedSet} />
          <Stat title="Bookmarks" value={stats.bookmark} />
          <Stat title="API Keys" value={stats.apikey} />
          <Stat title="JWT Calls" value={stats.activity.jwt} desc="Total Number Seen" />
          <Stat title="API Key Calls" value={stats.activity.key} desc="Total Number Seen" />
        </div>
        <h2>Top Users</h2>
        <ChartWrapper option={optionU} />
        <small className="tw-ml-4 tw-py-1 tw-opacity-80">
          <b>Note:</b> Ordered by JWT calls made to the FreeSewing backend
        </small>
        <div className="tw-max-h-96 tw-overflow-scroll">
          <ol className="tw-list tw-list-inside tw-list-decimal tw-ml-4">
            {stats.topUsers.map((u) => (
              <li key={u.id}>
                <Link href={`/users/user?id=${u.id}`} className={linkClasses}>
                  {u.username}
                </Link>
                : {formatNumber(u.calls)}
              </li>
            ))}
          </ol>
        </div>
        <h2>Top Designs</h2>
        <ChartWrapper option={optionD} />
        <small className="tw-ml-4 tw-py-1 tw-opacity-80">
          <b>Note:</b> Ordered by patterns stored in the FreeSewing backend
        </small>
        <div className="tw-max-h-96 tw-overflow-scroll">
          <ol className="tw-list tw-list-inside tw-list-decimal tw-ml-4">
            {Object.entries(stats.designs).map(([d, c]) => (
              <li key={d}>
                <Link href={`/designs/${d}`} className={linkClasses}>
                  <span className="tw-capitalize">{d}</span>
                </Link>
                : {formatNumber(c)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </DocusaurusPage>
  )
}

const Stat = ({ title, value, desc = 'Total Number Stored' }) => (
  <div className="tw-daisy-stats tw-shadow">
    <div className="tw-daisy-stat">
      <div className="tw-daisy-stat-title">{title}</div>
      <div className="tw-daisy-stat-value">{formatNumber(value)}</div>
      <div className="tw-daisy-stat-desc">{desc}</div>
    </div>
  </div>
)

const getStats = async (backend, setStats, setError) => {
  const result = await backend.getStats()
  if (result[0] === 200 && result[1]) setStats(result[1])
  else setError(true)
}
