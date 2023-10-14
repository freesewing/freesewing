import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import translators from 'site/prebuild/translators.json'
import { I18nIcon } from 'shared/components/icons.mjs'

export const ns = ['translation', 'i18n']

const sort = {
  all: (translators) => {
    const all = {}
    let max = 0
    for (const language of Object.keys(translators)) {
      for (const translator in translators[language]) {
        all[translator] = { ...translators[language][translator], language, translator }
        if (translators[language][translator].translated > max) {
          max = translators[language][translator].translated
        }
      }
    }

    return [orderBy(all, 'translated', 'desc'), max]
  },
  byLanguage: (translators) => {
    const all = {}
    const max = {}
    // First pass
    for (const language of Object.keys(translators)) {
      all[language] = {}
      max[language] = { max: 0, language }
      for (const translator in translators[language]) {
        all[language][translator] = { ...translators[language][translator], language, translator }
        if (translators[language][translator].translated > max[language].max) {
          max[language].max = translators[language][translator].translated
        }
      }
    }

    // Second pass
    for (const language of Object.keys(all)) {
      all[language] = orderBy(all[language], 'translated', 'desc')
    }

    return [all, max]
  },
}

const Score = ({ translated, max }) => (
  <div className="w-full">
    <div
      className="bg-primary rounded-lg h-4 flex flex-row items-center"
      style={{ width: (translated / max) * 100 + '%' }}
    >
      <span className="bg-primary bg-opacity-50 px-1.5 text-xs text-primary-content font-medium rounded-lg">
        {translated}
      </span>
    </div>
  </div>
)

const Ranking = ({ i }) =>
  i === 0 ? (
    <span role="img">🥇</span>
  ) : i === 1 ? (
    <span role="img">🥈</span>
  ) : i === 2 ? (
    <span role="img">🥉</span>
  ) : (
    '#' + (i + 1)
  )

export const Translators = () => {
  const { t } = useTranslation(ns)

  const [groupByLanguage, setGroupByLanguage] = useState(true)
  const [data, max] = groupByLanguage ? sort.byLanguage(translators) : sort.all(translators)

  return (
    <div className="max-w-full overflow-x-scroll">
      <p className="text-center">
        <button
          onClick={() => setGroupByLanguage(!groupByLanguage)}
          className="btn btn-primary btn-sm btn-outline capitalize"
        >
          {groupByLanguage ? t('translation:globalRanking') : t('translation:groupByLanguage')}
        </button>
      </p>
      <table className="table border-collapse">
        <thead className="text-lg">
          <tr>
            <th className="text-right">#</th>
            <th className="text-right">
              <I18nIcon className="w-5 h-5" />
            </th>
            <th>{t('translation:words')}</th>
            <th className="text-left">{t('translation:translator')}</th>
          </tr>
        </thead>
        <tbody>
          {groupByLanguage
            ? orderBy(max, 'max', 'desc').map(({ max, language }, i) => [
                <tr key={language}>
                  <td
                    className="py-1 uppercase font-medium text-center border-t text-xl"
                    colSpan={2}
                  >
                    <Ranking i={i} />
                  </td>
                  <td>{t(`locales:${language}`)}</td>
                  <td></td>
                </tr>,
                ...data[language].map((row, i) => (
                  <tr key={i}>
                    <td className="py-1 uppercase font-medium text-right border-t">
                      <Ranking i={i} />
                    </td>
                    <td className="py-1 uppercase font-bold text-right border-t">{row.language}</td>
                    <td className="py-1 w-full px-2 border-t">
                      <Score translated={row.translated} max={max} />
                    </td>
                    <td className="py-1 border-t font-medium">{row.translator}</td>
                  </tr>
                )),
              ])
            : data.map((row, i) => (
                <tr key={i}>
                  <td className="py-1 uppercase font-medium text-right border-t">
                    <Ranking i={i} />
                  </td>
                  <td className="py-1 uppercase font-bold text-right border-t">{row.language}</td>
                  <td className="py-1 w-full px-2 border-t">
                    <Score translated={row.translated} max={max} />
                  </td>
                  <td className="py-1 border-t font-medium">{row.translator}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
