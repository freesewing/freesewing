import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { designs } from 'shared/config/designs.mjs'
import { DesignTag } from 'shared/components/designs/tag.mjs'

export const ns = ['design', 'designs', 'tags']

const defaultLink = (design) => `/new/pattern/${design}`

export const Design = ({ name, hrefBuilder = false }) => {
  const { t } = useTranslation(ns)

  const getHref = hrefBuilder ? hrefBuilder : defaultLink

  return (
    <div
      className={`flex flex-col flex-nowrap items-start justify-start gap-2 pt-2 pb-4 h-auto w-96
          btn btn-secondary btn-ghost border border-secondary
          hover:bg-opacity-20 hover:bg-secondary hover:border hover:border-secondary
          relative`}
    >
      <Link
        href={getHref(name)}
        className="w-full h-full before:absolute before:inset-y-0 before:inset-x-0"
      >
        <h5 className="flex flex-row items-center justify-between w-full">
          <span>{t(`designs:${name}.t`)}</span>
          <span className="flex flex-col items-end">
            <span className="text-xs font-medium opacity-70">{t('design:difficulty')}</span>
            <Difficulty score={designs[name].difficulty} />
          </span>
        </h5>
        <span className={`normal-case text-base font-medium text-base-content text-left grow`}>
          {t(`designs:${name}.d`)}
        </span>
      </Link>
      <span className="flex flex-row flex-wrap gap-1 relative z-10">
        {designs[name].tags.map((tag) => (
          <DesignTag key={tag} tag={tag} />
        ))}
      </span>
    </div>
  )
}
