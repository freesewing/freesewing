import React from 'react'
import { mergeProps, isObject } from './utils.mjs'
import { Popout as SwizzledPopout } from './editor/swizzle/components/popout.mjs'
import { CloseIcon } from './editor/swizzle/components/icons.mjs'
import { t } from '#methods'

export const Popout = (props) => <SwizzledPopout {...mergeProps( props, { CloseIcon } , { t })} />

