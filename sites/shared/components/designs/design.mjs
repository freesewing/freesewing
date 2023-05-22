import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { designs } from 'shared/config/designs.mjs'
import { DesignTag } from 'shared/components/designs/tag.mjs'

export const ns = ['design', 'designs', 'tags']

export const Design = ({ name }) => {
  const { t } = useTranslation(ns)
  console.log(name)
  return (
    <Link
      href={`/new/pattern/${name}`}
      className={`flex flex-col flex-nowrap items-start justify-start gap-2 pt-2 pb-4 h-auto w-96
        btn btn-secondary btn-ghost border border-secondary
        hover:bg-opacity-20 hover:bg-secondary hover:border hover:border-secondary`}
    >
      <h5 className="flex flex-row items-center justify-between w-full">
        <span>{t(`designs:${name}.t`)}</span>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium opacity-70">{t('design:difficulty')}</span>
          <Difficulty score={designs[name].difficulty} />
        </div>
      </h5>
      <div className={`normal-case text-base font-medium text-base-content text-left grow`}>
        {t(`designs:${name}.d`)}
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        {designs[name].tags.map((tag) => (
          <DesignTag key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  )
}
