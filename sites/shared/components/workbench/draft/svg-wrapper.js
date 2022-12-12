import { SizeMe } from 'react-sizeme'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Svg from './svg'
import Defs from './defs'
import Stack from './stack'
import { forwardRef } from 'react'

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

const SvgWrapper = forwardRef((props, ref) => {
  const { patternProps = false, gist, updateGist, unsetGist, showInfo, viewBox } = props

  if (!patternProps) return null

  return (
    <SizeMe>
      {({ size }) => (
        <TransformWrapper
          minScale={0.1}
          centerZoomedOut={true}
          wheel={{ activationKeys: ['Control'] }}
        >
          <TransformComponent>
            <div style={{ width: size.width + 'px' }}>
              <Svg {...patternProps} viewBox={viewBox} embed={gist.embed} ref={ref}>
                <Defs {...patternProps} />
                <style>{`:root { --pattern-scale: ${gist.scale || 1}} ${
                  patternProps.svg.style
                }`}</style>
                <g>
                  {props.children ||
                    Object.keys(patternProps.stacks).map((stackName) => (
                      <Stack
                        {...{ gist, updateGist, unsetGist, showInfo, patternProps }}
                        key={stackName}
                        stackName={stackName}
                        stack={patternProps.stacks[stackName]}
                      />
                    ))}
                </g>
              </Svg>
            </div>
          </TransformComponent>
        </TransformWrapper>
      )}
    </SizeMe>
  )
})

SvgWrapper.displayName = 'SvgWrapper'

export default SvgWrapper
