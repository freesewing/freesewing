import { useEffect, useState, useRef } from 'react'
import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render.js'
import coarse from './dot-rough.js'
import Popout from 'shared/components/popout'
import oc from 'open-color'
import { useTranslation } from 'next-i18next'

// Some regex voodoo to allow people to use open-color
// colors like oc-orange-5 and make it 'just work'
const regexA = /(oc-((gray)|(red)|(pink)|(grape)|(violet)|(indigo)|(blue)|(cyan)|(teal)|(green)|(lime)|(yellow)|(orange))-([0-9]))/g
const regexB = /(oc-((gray)|(red)|(pink)|(grape)|(violet)|(indigo)|(blue)|(cyan)|(teal)|(green)|(lime)|(yellow)|(orange)))/g
const getColorTint = (a,b,color) => oc[color][a.slice(-1)]
const getColor = (a,b,color,tint=false) => oc[color][5]
const colorDot = dot => dot
  .replace(regexA, getColorTint)
  .replace(regexB, getColor)

// More regex voodoo to handle translation
// Looking for prefix i18n: and terminated by ther space of "
const regexC = /i18n:([^ "]+)/g
const i18nDot = (dot, t) => dot.replace(regexC, (a,b) => t(b))


const Dot = props => {

  const { t } = useTranslation(['app'])
  const { plain=false } = props

  const wrapDot = dot => {
    if (dot.slice(0,7) === 'digraph') return dot

    return plain
    ? `digraph G { bgcolor=transparent; ${i18nDot(colorDot(dot), t)} }`
    : `digraph G {
  graph [fontname = "Indie Flower"];
  node [fontname = "Indie Flower"];
  edge [fontname = "Indie Flower"];
  bgcolor=transparent; ${i18nDot(colorDot(dot), t)} }`
  }

  // Extract code/caption from props
  const [code, caption] = props.children
  // Extract dot code from mdx
  const dot = wrapDot(code.props.children.props.children)
  // Initialize viz library
  const viz = new Viz({ Module, render })

  // State and effect are needed to run async code as this
  // library always returns a promise
  const svgRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [reveal, setReveal] = useState(false)
  const [zoom, setZoom] = useState(false)
  useEffect(() => {
    viz.renderString(dot).then(res => {
      setSvg(res)
      if (!plain) coarse(svgRef.current)
      // Strip width/height so it's responsive
      svgRef.current.children[0].attributes.width.value = ""
      svgRef.current.children[0].attributes.height.value = ""
      // Add class for specific styling
      svgRef.current.children[0].setAttribute('class', "no-fs")
    })
  }, [dot])

  return (
    <figure className="py-2">
      <div className="flex flex-row justify-end">
        <button className="btn btn-link block mr-0" onClick={() => setReveal(!reveal)}>
          {reveal ? 'Hide' : 'Show'} code
        </button>
      </div>
      <div className={zoom
        ? "fixed top-0 left-0 right-0 w-screen h-screen bg-base-100 bg-opacity-90 z-30 hover:cursor-zoom-out p-12 flex flex-col justify-center"
        : ''
      } onClick={() => zoom ? setZoom(false) : null}>
        <div
          ref={svgRef}
          onClick={() => setZoom(!zoom)}
          className={zoom
            ? 'svg-zoom non-fs-svg text-base-content'
            : "dot shadow p-2 rounded -mt-8 hover:cursor-zoom-in text-base-content non-fs-svg"
          }
          dangerouslySetInnerHTML={{__html: svg}}
        />
        {reveal && !zoom && (
        <>
          <Popout tip>
            <h4>You can edit this online</h4>
            <p>
              Use a site like <a href="https://sketchviz.com">SketchViz</a> or
              another online <a href="https://graphviz.gitlab.io/">Graphviz</a> editor
              to edit this diagram. You can use its source code below as a starting point.
            </p>
          </Popout>
          <pre className={`
            language-txt text-base lg:text-lg whitespace-pre-wrap break-words
            bg-neutral p-4 px-6 rounded-lg text-neutral-content
            `}
            >{dot}</pre>
        </>
        )}
        <figcaption className="text-center -mt-2 italic">
          {caption || ''}
        </figcaption>
      </div>
    </figure>
  )
}

export default Dot

