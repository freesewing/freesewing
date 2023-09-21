// Dependencies
import orderBy from 'lodash.orderby'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import Link from 'next/link'
import { WordMark } from 'shared/components/wordmark.mjs'
import { SocialIcons } from 'shared/components/social/icons.mjs'
import { Sponsors, ns as sponsorsNs } from 'shared/components/sponsors/index.mjs'
import { FreeSewingIcon } from 'shared/components/icons.mjs'

export const ns = ['common', ...sponsorsNs]

const onlyFooterLinks = (tree) => orderBy(tree, ['t'], ['asc']).filter((entry) => entry.f)

export const Footer = () => {
  // Grab siteNav from the navigation context
  const { siteNav } = useContext(NavigationContext)
  const { t } = useTranslation(ns)

  return (
    <footer className="bg-neutral">
      <div className="w-full sm:w-auto flex flex-col gap-2 items-center justify-center pt-12">
        <FreeSewingIcon className="w-24 lg:w-40 m-auto m-auto text-neutral-content" />
        <div className="mt-4">
          <WordMark />
        </div>
        <p className="text-neutral-content text-normal leading-5 text-center -mt-2 opacity-70 font-normal">
          {t('common:slogan1')}
          <br />
          {t('common:slogan2')}
        </p>
      </div>

      <div className="w-full max-w-xl text-center py-8 m-auto">
        <ul className="text-neutral-content list inline font-medium text-center">
          {onlyFooterLinks(siteNav).map((page) => (
            <li key={page.s} className="block lg:inline">
              <Link href={page.s} className="p-3 underline decoration-2 hover:decoration-4">
                {page.t}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full sm:w-auto flex flex-row flex-wrap gap-6 lg:gap-8 items-center justify-center px-8 py-14">
        <SocialIcons />
      </div>

      <div className="mt-8 py-8 px-8 flex flex-row gap-8 flex-wrap 2xl:flex-nowrap justify-around text-neutral-content py-10 border border-solid border-l-0 border-r-0 border-b-0 border-base-300">
        <Sponsors />
      </div>
    </footer>
  )
}
