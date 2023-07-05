import { useState, useEffect } from 'react'
import { siteConfig } from 'site/site.config.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { ChartWrapper } from 'shared/components/wrappers/chart.mjs'
import orderBy from 'lodash.orderby'

/*
 * This method load the translation status from the Crowdin API
 */
const loadTranslationStatus = async (setter) => {
  let response
  try {
    response = await fetch(
      `https://api.crowdin.com/api/v2/projects/${siteConfig.crowdin.projectId}/languages/progress`,
      { headers: { Authorization: `Bearer ${siteConfig.crowdin.token}` } }
    )
  } catch (err) {
    console.log(err)
    setter(err)
  }
  if (response) {
    const data = await response.json()
    setter(data)
  }
}

const Status = ({ done, approved }) => {
  const option = {
    series: [
      {
        name: 'Translation Status',
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: false,
        },
        emphasis: {
          disabled: true,
        },
        data: [
          {
            value: approved,
            name: 'Translated & Approved',
            itemStyle: {
              color: 'currentColor',
              opacity: 1,
            },
          },
          {
            value: done,
            name: 'Translated & Approved',
            itemStyle: {
              color: 'currentColor',
              opacity: 0.7,
            },
          },
          {
            value: 100 - (done + approved),
            name: 'Untranslated',
            itemStyle: {
              color: 'currentColor',
              opacity: 0.3,
            },
          },
        ],
      },
    ],
  }

  return <ChartWrapper option={option} h={150} />
}

export const TranslationStatus = () => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (!status) loadTranslationStatus(setStatus)
  }, [status])

  return status ? (
    <>
      <div className="text-primary flex flex-row flex-wrap items-center space-around w-full">
        {status.data &&
          orderBy(status.data, ['data.approvalProgress'], ['desc']).map((entry) => (
            <div className="text-center" key={entry.data.languageId} style={{ width: '150px' }}>
              <h5>
                {entry.data.languageId.indexOf('-') === -1
                  ? entry.data.languageId.toUpperCase()
                  : entry.data.languageId.split('-')[0].toUpperCase()}
                : {entry.data.approvalProgress}%
              </h5>
              <Status
                done={entry.data.translationProgress - entry.data.approvalProgress}
                approved={entry.data.approvalProgress}
              />
            </div>
          ))}
      </div>
    </>
  ) : (
    <Spinner className="w-24 h-24 m-auto text-primary animate-spin" />
  )
}
