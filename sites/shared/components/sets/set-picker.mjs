// Dependencies
import orderBy from 'lodash.orderby'
import { measurements } from 'shared/prebuild/data/design-measurements.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { capitalize } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { SetCandidate, ns as setNs } from 'shared/components/sets/set-candidate.mjs'
import { PopoutWrapper } from 'shared/components/wrappers/popout.mjs'
import { Tag } from 'shared/components/tag.mjs'
import { FilterIcon } from 'shared/components/icons.mjs'

export const ns = setNs

export const CuratedSetPicker = ({ design, language, href, clickHandler }) => {
  // Hooks
  const { token } = useAccount()
  const backend = useBackend(token)
  const { t, i18n } = useTranslation('sets')

  // State
  const [curatedSets, setCuratedSets] = useState([])
  const [filter, setFilter] = useState([])
  const [tags, setTags] = useState([])

  // Effects
  useEffect(() => {
    const getCuratedSets = async () => {
      const result = await backend.getCuratedSets()
      if (result.success) {
        const all = []
        const allTags = new Set()
        for (const set of result.data.curatedSets) {
          all.push(set)
          for (const tag of set[`tags${capitalize(language)}`]) allTags.add(tag)
        }
        setCuratedSets(all)
        setTags([...allTags])
      }
    }
    getCuratedSets()
  }, [backend, language])

  const addFilter = (tag) => {
    const newFilter = [...filter, tag]
    setFilter(newFilter)
  }

  const removeFilter = (tag) => {
    const newFilter = filter.filter((t) => t !== tag)
    setFilter(newFilter)
  }

  const applyFilter = () => {
    const newList = new Set()
    for (const set of curatedSets) {
      const setTags = []
      for (const lang of siteConfig.languages) {
        const key = `tags${capitalize(lang)}`
        if (set[key]) setTags.push(...set[key])
      }
      let match = 0
      for (const tag of filter) {
        if (setTags.includes(tag)) match++
      }
      if (match === filter.length) newList.add(set)
    }

    return [...newList]
  }

  const list = applyFilter()

  // Need to sort designs by their translated title
  const translated = {}
  for (const d of list) translated[t(`${d}.t`)] = d

  return (
    <>
      <h3>{t('curatedSets')}</h3>
      {tags.map((tag) => (
        <Tag onClick={() => addFilter(tag)} tag={tag} key={tag}>
          {tag}
        </Tag>
      ))}
      <div className="my-2 p-2 px-4 border rounded-lg bg-secondary bg-opacity-10 max-w-xl">
        <div className="flex flex-row items-center justify-between gap-2">
          <FilterIcon className="w-6 h-6 text-secondary" />
          <span>
            {list.length} / {curatedSets.length}
          </span>
          <button onClick={() => setFilter([])} className="btn btn-secondary btn-sm">
            clear
          </button>
        </div>
        {filter.map((tag) => (
          <Tag onClick={() => removeFilter(tag)} color="success" hoverColor="error" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {orderBy(list, ['name'], ['asc']).map((set) => (
          <div className="w-full lg:w-96" key={set.id}>
            <SetCandidate
              requiredMeasies={measurements[design]}
              {...{ set, design, href, clickHandler, language: i18n.language }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export const UserSetPicker = ({ design, t, href, clickHandler }) => {
  // Hooks
  const { token } = useAccount()
  const backend = useBackend(token)

  // State
  const [sets, setSets] = useState({})

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) {
        const all = {}
        for (const set of result.data.sets) all[set.id] = set
        setSets(all)
      }
    }
    getSets()
  }, [backend])

  return Object.keys(sets).length < 1 ? (
    <PopoutWrapper tip noP>
      <h5>{t('patternForWhichSet')}</h5>
      <p>{t('fsmtm')}</p>
    </PopoutWrapper>
  ) : (
    <>
      <h3>{t('yourSets')}</h3>
      {Object.keys(sets).length > 0 ? (
        <>
          <div className="flex flex-row flex-wrap gap-2">
            {orderBy(sets, ['name'], ['asc']).map((set) => (
              <div className="w-full lg:w-96" key={set.id}>
                <SetCandidate
                  requiredMeasies={measurements[design]}
                  {...{ set, design, href, clickHandler }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <PopoutWrapper fixme compact>
          Implement UI for when there are no sets
        </PopoutWrapper>
      )}
    </>
  )
}

export const BookmarkedSetPicker = ({ t }) => (
  <>
    <h3>{t('bookmarkedSets')}</h3>
    <PopoutWrapper fixme>Implement bookmarked set picker (also implement bookmarks)</PopoutWrapper>
  </>
)

export const SetPicker = ({ design, href = false, clickHandler = false }) => {
  const { t, i18n } = useTranslation('sets')
  const { language } = i18n

  const pickerProps = { design, t, language, href, clickHandler }

  return (
    <>
      <h2>{t('chooseSet')}</h2>
      <UserSetPicker {...pickerProps} />
      <CuratedSetPicker {...pickerProps} />
    </>
  )
}

//<BookmarkedSetPicker {...pickerProps} />
//<CuratedSetPicker {...pickerProps} />
