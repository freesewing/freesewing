import { useTranslation } from 'next-i18next'
import { scrollTo } from 'shared/utils.mjs'

export const ns = ['docs']

const Spacer = () => <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

export const Toc = ({ toc = [], wrap = false }) => {
  const { t } = useTranslation(ns)
  if (toc.length < 1) return null
  const ul = (
    <ul className="hidden lg:block -ml-6 pl-0">
      {toc.map((entry, i) => (
        <li key={i} style={{ paddingLeft: 0.5 * entry.level + 'rem' }}>
          <a href={`#${entry.slug}`} title={entry.title}>
            {entry.title}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <select
        className="block lg:hidden max-w-full select select-secondary"
        onChange={(evt) => scrollTo(evt.target.value)}
        defaultValue="_"
      >
        <option value="_">{t('toc')}</option>
        {toc.map((entry, i) => {
          const space = []
          for (let i = 1; i <= entry.level; i++) space.push(<Spacer key={i} />)
          return (
            <option value={entry.slug} key={i} className="whitespace-pre">
              {space}
              {entry.title}
            </option>
          )
        })}
      </select>
      {wrap ? (
        <div
          className={`
            hidden lg:block
            mdx mdx-toc text-base-content text-base
            sticky top-16 max-h-screen overflow-y-auto
            border-2 bg-base-200 bg-opacity-30 p-4 rounded-lg border-base-200
          `}
        >
          <h4>{t('toc')}</h4>
          {ul}
        </div>
      ) : (
        ul
      )}
    </>
  )
}
