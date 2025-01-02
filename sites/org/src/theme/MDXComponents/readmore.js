import React from 'react'
import DocCardList from '@theme/DocCardList'
import { useCurrentSidebarCategory } from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'

export const ReadMore = ({ cards = false }) =>
  cards ? (
    <DocCardList items={useCurrentSidebarCategory().items} />
  ) : (
    <DocList items={useCurrentSidebarCategory().items} />
  )

const DocList = ({ items }) => {
  const links = []
  for (const item of items) {
    if (['link', 'category'].includes(item.type)) {
      links.push(
        <li key={item.docId}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      )
    }
  }

  return <ul>{links}</ul>
}
