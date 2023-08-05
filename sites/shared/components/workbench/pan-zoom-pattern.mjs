// Dependencies
import { forwardRef, useContext } from 'react'
// Hooks
import { useTranslation } from 'next-i18next'
// Context
import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
// Components
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Pattern } from 'pkgs/react-components/src/index.mjs'

export const ns = ['workbench']

/*
 * A pattern you can pan and zoom
 */
export const PanZoomPattern = forwardRef((props, ref) => {
  const { t } = useTranslation(ns)

  const { renderProps = false, components = {} } = props
  const { onTransformed, setZoomFunctions } = useContext(PanZoomContext)

  return (
    <TransformWrapper
      minScale={0.1}
      centerZoomedOut={true}
      centerOnInit={true}
      wheel={{ activationKeys: ['Control'] }}
      doubleClick={{ mode: 'reset' }}
      onTransformed={onTransformed}
      onInit={setZoomFunctions}
    >
      <TransformComponent
        wrapperStyle={{ width: '100%', height: '100%' }}
        contentStyle={{ width: '100%', height: '100%' }}
        wrapperClass={'pan-zoom-pattern'}
        id="pan-zoom-pattern"
      >
        {props.children || <Pattern {...{ t, components, renderProps }} ref={ref} />}
      </TransformComponent>
    </TransformWrapper>
  )
})

PanZoomPattern.displayName = 'PanZoomPattern'
