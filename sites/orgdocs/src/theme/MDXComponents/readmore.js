import React from 'react'
import DocCardList from '@theme/DocCardList'
import DocList from '@site/src/components/doc-list.js'
import {useCurrentSidebarCategory} from '@docusaurus/theme-common'

export const ReadMore = ({ cards=false }) => cards
  ? <DocCardList items={useCurrentSidebarCategory().items}/>
  : <DocList items={useCurrentSidebarCategory().items}/>

