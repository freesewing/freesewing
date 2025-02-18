import React from 'react'
import { mergeProps } from './utils.mjs'
import { Popout as SwizzledPopout } from './editor/swizzle/components/popout.mjs'
import { CloseIcon } from './editor/swizzle/components/icons.mjs'

const t = (id) => id

export const Popout = (props) => <SwizzledPopout {...mergeProps(props, { CloseIcon }, { t })} />
