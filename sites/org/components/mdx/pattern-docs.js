import React from 'react'
import { capitalize } from 'shared/utils.js'
import { getConfig } from 'shared/designs/index.js'
import Popout from 'shared/components/popout.js'
import { useTranslation } from 'next-i18next'
import Design from 'site/components/design.js'
import PatternOptions from './pattern-options'
import PatternMeasurements from './pattern-measurements'
import DocsLink from 'shared/components/docs-link'

const PatternDocs = ({ pattern=false }) => {
  const { t } = useTranslation(['common'])

  if (!pattern) return <p>Please specify a pattern prop when using the PatternDocs component</p>

  const config = getConfig(pattern)
    console.log({pattern, config})

  return (
    <>
      {config.deprecated && (
        <Popout note>
          <h5>{t('thingIsDeprecated', { thing: capitalize(pattern)})}</h5>
          <p>
            {t('weRecommendThingInstead', { thing: capitalize(config.deprecated)})}
          </p>
          <Design design={pattern} />
        </Popout>
      )}

      <button className="btn btn-primary btn-large btn-contained"
        href={`/create/${pattern}`}
      >
        {t('newThing', { thing: pattern })}
      </button>
      <p>{t(`patterns.${pattern}.description`)}</p>

      <PatternMeasurements pattern={pattern}
        before={<h2>{t('common:requiredMeasurements')}</h2>} />

      <PatternOptions pattern={pattern}
        before={<h2>{t('common:patternOptions')}</h2>} />

      <h2>{t('common:patternInstructions')}</h2>
      <ul className="links">
        <li>
          <DocsLink slug={`docs/patterns/${pattern}/needs`} />
        </li>
        <li>
          <DocsLink slug={`docs/patterns/${pattern}/fabric`} />
        </li>
        <li>
          <DocsLink slug={`docs/patterns/${pattern}/cutting`} />
        </li>
        <li>
          <DocsLink slug={`docs/patterns/${pattern}/instructions`} />
        </li>
      </ul>
    </>
  )
}

export default PatternDocs
