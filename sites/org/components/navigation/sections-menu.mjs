import { useContext } from 'react'
import Link from 'next/link'
import { icons, ns as sectionsNs } from 'shared/components/navigation/primary.mjs'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import { colors } from 'shared/components/header.mjs'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { HelpIcon } from 'shared/components/icons.mjs'

export const ns = sectionsNs

export const SectionsMenu = () => {
  const { t } = useTranslation(ns)
  const { sections = false } = useContext(NavigationContext)
  if (!sections) return null

  // Ensure each page as an `o` key so we can put them in order
  const sortableSections = sections.map((s) => ({ ...s, o: s.o ? s.o : s.t }))
  const output = []
  let i = 1
  for (const page of orderBy(sortableSections, ['o', 't'])) {
    const item = (
      <Link
        key={page.s}
        className={`bg-${colors[i]}-400 p-0 rounded shadow hover:shadow-lg w-full bg-opacity-70 hover:bg-opacity-100 text-neutral-900
            `}
        href={`/${page.s}`}
        title={page.t}
      >
        <div className="flex flex-col rounded">
          <div className={`flex flex-row items-center justify-between pt-2 px-4`}>
            <h4 className="text-neutral-900">{page.t}</h4>
            {icons[page.s] ? icons[page.s]('w-10 h-10') : <HelpIcon />}
          </div>
          <div className={`font-medium text-base leading-5 text-left rounded-b py-4 px-4 `}>
            {t(page.s + 'About')}
          </div>
        </div>
      </Link>
    )
    i++
    output.push(item)
  }

  return <div className="flex flex-col gap-2">{output}</div>
}
