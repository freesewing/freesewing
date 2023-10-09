import { useTranslation } from 'next-i18next'
import { scrollTo } from 'shared/utils.mjs'

export const ns = ['docs']

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
        className="block xl:hidden w-full select select-secondary"
        onChange={(evt) => scrollTo(evt.target.value)}
        defaultValue="_"
        id="toc-select"
      >
        <option value="toc-select">{t('toc')}</option>
        {toc.map((entry, i) => (
          <option value={entry.slug} key={i} className="whitespace-pre">
            {entry.title}
          </option>
        ))}
      </select>
      {wrap ? (
        <div
          className={`
            hidden xl:block
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
