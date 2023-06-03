// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { Point } from './point.mjs'
import { Path } from './path.mjs'

export const InspectorPattern = (props) => {
  const { t } = useTranslation(['workbench'])
  const inspector = props.inspector

  const components = {
    Point: (props) => <Point {...props} inspector={inspector} />,
    Path: (props) => <Path {...props} inspector={inspector} />,
  }

  return <PanZoomPattern {...props} {...{ t, components }} />
}
