import { designs, tags, techniques } from 'shared/config/designs.mjs'
import { Design, DesignLink, ns as designNs } from 'shared/components/designs/design.mjs'
import { useTranslation } from 'next-i18next'
import { ShowcaseIcon, CisFemaleIcon, ResetIcon } from 'shared/components/icons.mjs'
import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai-location'
import { capitalize, objUpdate } from 'shared/utils.mjs'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'

export const ns = designNs

const filterAtom = atomWithHash('filter', { example: true })

export const useFilter = () => {
  return useAtom(filterAtom)
}

export const DesignPicker = ({ linkTo = 'new', altLinkTo = 'docs' }) => {
  const { t } = useTranslation('designs')
  const [filter, setFilter] = useFilter()

  // Need to sort designs by their translated title
  // let's also apply the filters while we're at it
  const translated = {}
  for (const d in designs) {
    let skip = false
    if (
      filter.tag &&
      filter.tag.filter((tag) => designs[d].tags.includes(tag)).length < filter.tag.length
    )
      skip = true
    if (
      filter.tech &&
      filter.tech.filter((tech) => designs[d].techniques.includes(tech)).length < filter.tech.length
    )
      skip = true
    if (filter.difficulty && filter.difficulty !== designs[d].difficulty) skip = true
    if (!skip) translated[t(`${d}.t`)] = d
  }

  const updateFilter = (path, val) => {
    const newFilter = objUpdate({ ...filter }, path, val)
    setFilter(newFilter)
  }

  const toggle = (type, val) => {
    const current = filter[type] || []
    const newSet = new Set(current)
    if (newSet.has(val)) newSet.delete(val)
    else newSet.add(val)
    updateFilter(type, [...newSet])
  }

  return (
    <>
      <div className="max-w-7xl m-auto">
        <div className="flex flex-row flex-wrap gap-1 justify-center font-medium">
          {Object.values(translated)
            .sort()
            .map((d) => (
              <DesignLink key={d} linkTo={linkTo} altLinkTo={altLinkTo} name={capitalize(d)} />
            ))}
        </div>
        <h6 className="text-center mb-0 mt-4">
          Filters ({Object.keys(translated).length}/{Object.keys(designs).length})
        </h6>
        <div className="flex flex-row gap-1 items-center justify-center flex-wrap my-2">
          <b>{t('tags:tags')}:</b>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`badge font-medium hover:shadow
             ${
               filter?.tag && Array.isArray(filter.tag) && filter.tag.includes(tag)
                 ? 'badge badge-success hover:badge-error'
                 : 'badge badge-primary hover:badge-success'
             }`}
              onClick={() => toggle('tag', tag)}
            >
              {t(`tags:${tag}`)}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-1 items-center justify-center flex-wrap my-4">
          <b>{t('techniques:techniques')}:</b>
          {techniques.map((tech) => (
            <button
              key={tech}
              className={`badge font-medium hover:shadow
             ${
               filter?.tech && Array.isArray(filter.tech) && filter.tech.includes(tech)
                 ? 'badge badge-success hover:badge-error'
                 : 'badge badge-accent hover:badge-success'
             }`}
              onClick={() => toggle('tech', tech)}
            >
              {t(`techniques:${tech}`)}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-2 items-center justify-center flex-wrap my-4">
          <b>{t('tags:difficulty')}:</b>
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              onClick={() => updateFilter('difficulty', score)}
              key={score}
              className={`btn btn-sm ${
                filter.difficulty === score ? 'btn-secondary btn-outline' : 'btn-ghost'
              }`}
            >
              <Difficulty score={score} />
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-4 items-center justify-center flex-wrap my-2">
          <button
            className="btn btn-secondary btn-outline"
            onClick={() => updateFilter('example', !filter.example)}
          >
            {filter.example ? <CisFemaleIcon /> : <ShowcaseIcon />}
            {filter.example ? t('tags:showLineDrawings') : t('tags:showExamples')}
          </button>
          <button
            className="btn btn-secondary btn-outline"
            onClick={() => setFilter({ example: 1 })}
          >
            <ResetIcon />
            {t('tags:clearFilter')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Object.keys(translated)
          .sort()
          .map((d) => (
            <Design
              name={translated[d]}
              key={d}
              linkTo={linkTo}
              altLinkTo={altLinkTo}
              lineDrawing={filter.example ? false : true}
            />
          ))}
      </div>
    </>
  )
}
