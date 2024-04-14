import { Popout } from '../../popout/index.mjs'
//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
//import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
//import { designMeasurements, horFlexClasses, capitalize } from 'shared/utils.mjs'
// Hooks
//import { useTranslation } from 'next-i18next'
// Components
import { Fragment } from 'react'
//import {
//  UserSetPicker,
//  BookmarkedSetPicker,
//  ns as setsNs,
//} from 'shared/components/account/sets.mjs'
//import { CuratedSetPicker } from 'shared/components/curated-sets.mjs'
//import { Accordion } from 'shared/components/accordion.mjs'
//import { MsetIcon, BookmarkIcon, CsetIcon, EditIcon } from 'shared/components/icons.mjs'


const iconClasses = { className: 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0', stroke: 1.5 }

export const MeasiesView = ({ design, Design, settings, update, missingMeasurements, setView, t }) => {

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    // Save the measurement set name to pattern settings
    if (set[`name${capitalize(lang)}`])
      // Curated measurement set
      update.settings([[['metadata'], { setName: set[`name${capitalize(lang)}`] }]])
    else if (set?.name)
      // User measurement set
      update.settings([[['metadata'], { setName: set.name }]])
    setView('draft')
  }

  const loadMissingMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    setView('measies')
  }

  return (
    <div className="max-w-7xl mt-8 mx-auto px-4">
      <h2>{t('account:measurements')}</h2>
      {missingMeasurements &&
        settings.measurements &&
        Object.keys(settings.measurements).length > 0 && (
          <Popout note dense noP>
            <h5>{t('weLackSomeMeasies', { nr: missingMeasurements.length })}</h5>
            <ol className="list list-inside ml-4 list-decimal">
              {missingMeasurements.map((m, i) => (
                <li key={i}>{t(`measurements:${m}`)}</li>
              ))}
            </ol>
            <p className="text-lg">{t('youCanPickOrEnter')}</p>
          </Popout>
        )}
      {!missingMeasurements && (
        <Popout note ompact>
          <span className="text-lg">{t('measiesOk')}</span>
        </Popout>
      )}
      <Accordion
        items={[
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="ownsets">{t('workbench:chooseFromOwnSets')}</h5>
                <MsetIcon {...iconClasses} />
              </div>
              <p>{t('workbench:chooseFromOwnSetsDesc')}</p>
            </Fragment>,
            <UserSetPicker
              key={2}
              design={design}
              clickHandler={loadMeasurements}
              missingClickHandler={loadMissingMeasurements}
              t={t}
              size="md"
            />,
            'ownSets',
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="bookmarkedsets">{t('workbench:chooseFromBookmarkedSets')}</h5>
                <BookmarkIcon {...iconClasses} />
              </div>
              <p>{t('workbench:chooseFromBookmarkedSetsDesc')}</p>
            </Fragment>,
            <BookmarkedSetPicker
              design={design}
              clickHandler={loadMeasurements}
              t={t}
              size="md"
              key={2}
            />,
            'bmSets',
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="curatedsets">{t('workbench:chooseFromCuratedSets')}</h5>
                <CsetIcon {...iconClasses} />
              </div>
              <p>{t('workbench:chooseFromCuratedSetsDesc')}</p>
            </Fragment>,
            <CuratedSetPicker design={design} clickHandler={loadMeasurements} t={t} key={2} />,
            'csets',
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="editmeasies">{t('workbench:editMeasiesByHand')}</h5>
                <EditIcon {...iconClasses} />
              </div>
              <p>{t('workbench:editMeasiesByHandDesc')}</p>
            </Fragment>,
            <MeasiesEditor {...{ Design, settings, update }} key={2} />,
            'editor',
          ],
        ]}
      />
    </div>
  )
}


const MeasiesEditor = ({ Design, settings, update }) => {
  const { t, i18n } = useTranslation(ns)

  const onUpdate = (m, newVal) => {
    update.settings(['measurements', m], newVal)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h5>{t('account:requiredMeasurements')}</h5>
      {Object.keys(Design.patternConfig.measurements).length === 0 ? (
        <p>({t('account:none')})</p>
      ) : (
        <div>
          {Design.patternConfig.measurements.map((m) => (
            <MeasieInput
              key={m}
              m={m}
              imperial={settings.units === 'imperial' ? true : false}
              original={settings.measurements?.[m]}
              update={(m, newVal) => onUpdate(m, newVal)}
              id={`edit-${m}`}
              docs={
                <DynamicMdx
                  language={i18n.language}
                  slug={`docs/measurements/${m.toLowerCase()}`}
                />
              }
            />
          ))}
          <br />
        </div>
      )}
      <h5>{t('account:optionalMeasurements')}</h5>
      {Object.keys(Design.patternConfig.optionalMeasurements).length === 0 ? (
        <p>({t('account:none')})</p>
      ) : (
        Design.patternConfig.optionalMeasurements.map((m) => (
          <MeasieInput
            key={m}
            m={m}
            imperial={settings.units === 'umperial' ? true : false}
            original={settings.measurements?.[m]}
            update={(m, newVal) => onUpdate(m, newVal)}
            id={`edit-${m}`}
            docs={
              <DynamicMdx language={i18n.language} slug={`docs/measurements/${m.toLowerCase()}`} />
            }
          />
        ))
      )}
    </div>
  )
}

