import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import Link from 'next/link'
import { icons, ns as sectionsNs } from 'shared/components/navigation/primary.mjs'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'

export const ns = sectionsNs

const onlySections = (tree) => orderBy(tree, ['t'], ['asc']).filter((entry) => entry.m)

// force tailwind compilation
const spectrumBg = [
  'bg-spectrum-0',
  'bg-spectrum-1',
  'bg-spectrum-2',
  'bg-spectrum-3',
  'bg-spectrum-4',
  'bg-spectrum-5',
  'bg-spectrum-6',
  'bg-spectrum-7',
  'bg-spectrum-8',
  'bg-spectrum-9',
  'bg-spectrum-10',
]

const sharedClasses = 'p-0 rounded shadow hover:shadow-lg w-full text-neutral-900'

export const SectionsMenu = ({ bOnly = false }) => {
  const { t } = useTranslation(ns)
  const { siteNav } = useContext(NavigationContext)

  const output = []
  let i = 1
  for (const page of onlySections(siteNav)) {
    if ((!bOnly && !page.h && !page.b) || (!page.h && bOnly && page.b)) {
      if (page.t !== 'spacer') {
        const item = (
          <Link
            key={page.s}
            className={
              bOnly
                ? `bg-secondary border border solid border-secondary bg-opacity-0 hover:bg-opacity-20 ${sharedClasses}`
                : `${spectrumBg[i]} bg-opacity-50 hover:bg-opacity-100 ${sharedClasses}`
            }
            href={`/${page.s}`}
            title={page.t}
          >
            <div className="flex flex-col rounded">
              <div className={`flex flex-row items-center justify-between pt-2 px-4`}>
                <h6 className="text-neutral-900">{page.t}</h6>
                {icons[page.s] ? icons[page.s]('w-10 h-10') : null}
              </div>
              <div
                className={`font-medium text-base leading-5 text-left rounded-b pt-0 pb-4 px-4 `}
              >
                {t(page.s + 'About')}
              </div>
            </div>
          </Link>
        )
        output.push(item)
        i++
      }
    }
  }

  return <div className="flex flex-col gap-2">{output}</div>
}
