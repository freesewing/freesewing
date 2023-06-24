// Dependencies
import { forwardRef, useContext } from 'react'
// Hooks
import { useTranslation } from 'next-i18next'
// Context
import { PanZoomContext } from 'shared/components/workbench/pattern/pan-zoom-context.mjs'
// Components
import { SizeMe } from 'react-sizeme'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Pattern } from 'pkgs/react-components/src/index.mjs'

export const ns = ['workbench']

/* What's with all the wrapping?
 *
 * Glad you asked. The problem lies within the pan & zoom functionality
 * For this to work, we need to reliably determine the container widht
 * However, our SVG is optimized for embedding (no width or height)
 * which means it will simply adapt to the parent container.
 * So now we have a parent container adapting to the content and the
 * content adapting to the parent. This creates a sort of stalemate
 * where the browser will render this as zero width and height.
 *
 * To avoid that, we use the SizeMe which will report the size of the
 * grandparent element, and then we wrap our SVG in a div that we
 * set to this size. This will cause the SVG to fill in that entire
 * space, and the pan and zoom to adapt to this size.
 *
 * Note that this also means that changing the browser window size
 * will cause things to get clipped until the next render.
 *
 * Also still to see how this will work with SSR
 */
export const PanZoomPattern = forwardRef((props, ref) => {
  const { t } = useTranslation(ns)

  const { renderProps = false, components = {} } = props
  const { onTransformed, setZoomFunctions } = useContext(PanZoomContext)

  return (
    <SizeMe refreshRate={64}>
      {({ size }) => (
        <TransformWrapper
          minScale={0.1}
          centerZoomedOut={true}
          wheel={{ activationKeys: ['Control'] }}
          doubleClick={{ mode: 'reset' }}
          onTransformed={onTransformed}
          onInit={setZoomFunctions}
        >
          <TransformComponent>
            <div style={{ width: size.width + 'px' }} className="max-h-screen">
              {props.children || <Pattern {...{ t, components, renderProps }} ref={ref} />}
            </div>
          </TransformComponent>
        </TransformWrapper>
      )}
    </SizeMe>
  )
})

PanZoomPattern.displayName = 'PanZoomPattern'
