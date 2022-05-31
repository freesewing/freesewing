import React from 'react'
import { capitalize } from 'shared/utils.js'
import Link from 'next/link'
import { getConfig } from 'shared/designs/index.js'
import Popout from 'shared/components/popout.js'
import { useTranslation } from 'next-i18next'
import DesignTeaser from 'site/components/designs/teaser.js'
//import PatternOptions from './pattern-options'
//import PatternMeasurements from './pattern-measurements'

const PatternDocs = ({ pattern=false }) => {
  const { t } = useTranslation(['docs'])

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
          <DesignTeaser design={pattern} />
        </Popout>
      )}
      <pre>{JSON.stringify(config, null ,2)}</pre>
    </>
  )

  return (
    <>
      {config.deprecated && (
        <Popout note>
          <h5>{capitalize(pattern)} is deprecated</h5>
          <p>
            We recommend{' '}
            <Link to={`/designs/${info[props.pattern].deprecated}/`}>
              {capitalize(info[props.pattern].deprecated)}
            </Link>{' '}
            instead.
          </p>
        </Popout>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <p>
          <FormattedMessage id={'patterns.' + props.pattern + '.description'} />
        </p>
        <div>
          <Button
            style={{ marginRight: '1rem' }}
            color="primary"
            variant="contained"
            size="large"
            href={'/create/' + props.pattern + '/'}
          >
            <PlayIcon style={{ marginRight: '1rem' }} />
            <FormattedMessage
              id="app.newThing"
              values={{
                thing: [capitalize(props.pattern), ' ', <FormattedMessage id={`app.pattern`} />],
              }}
            />
          </Button>
          <p>
            <Hashtag
              tag={`FreeSewing${capitalize(props.pattern)}`}
              title={`${capitalize(props.pattern)} Hashtag`}
            />
          </p>
        </div>
      </div>
      <h2>
        <FormattedMessage id="app.patternInstructions" />
      </h2>
      <ul className="links">
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/cutting/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.cutting" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/fabric/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.fabricOptions" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/instructions/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.instructions" />
          </Link>
        </li>
        <li>
          <Link to={'/docs/patterns/' + props.pattern + '/needs/'}>
            {capitalize(props.pattern)} &raquo; <FormattedMessage id="app.whatYouNeed" />
          </Link>
        </li>
      </ul>
      <h2>
        <FormattedMessage id="app.patternOptions" />
      </h2>
      <PatternOptions pattern={props.pattern} />
      {measurements[props.pattern].length > 0 ? (
        <>
          <h2>
            <FormattedMessage id="app.requiredMeasurements" />
          </h2>
          <PatternMeasurements pattern={props.pattern} app={props.app} />
        </>
      ) : null}
      <h2>
        <FormattedMessage id="app.examples" />
      </h2>
      <p>
        <FormattedMessage id="intro.txt-showcase" />:
      </p>
      <ul className="links">
        <li>
          <Link to={'/showcase/designs/' + props.pattern}>
            <FormattedMessage id="app.showcase" /> / {capitalize(props.pattern)}
          </Link>
        </li>
      </ul>
    </>
  )
}

export default PatternDocs
