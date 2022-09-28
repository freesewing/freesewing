import { useEffect, useState, useRef } from 'react'
import Viz from 'viz.js'
import { Module, render } from 'viz.js/full.render.js'
import coarse from './dot-rough.js'
import Popout from 'shared/components/popout'
import colors from 'tailwindcss/colors'

// Some regex voodoo to allow people to use tailwind colors
// Takes colors like tc-orange-500 and makes it 'just work'
const colorMatch = Object.keys(colors).map(color => `(${color})`).join('|')
const regexA = new RegExp(`(tc-(${colorMatch})-([0-9]+))`, 'g')
const regexB = new RegExp(`(tc-(${colorMatch}))`, 'g')

const getColorTint = (a,b,color) => colors[color][a.split('-').pop()]
const getColor = (a,b,color,tint=false) => colors[color][500]
const colorDot = dot => dot
  .replace(regexA, getColorTint)
  .replace(regexB, getColor)
const fixSvg = svg => svg.replace(/#000000/g, () => 'currentColor')
const wrapDot = dot => {
  if (dot.slice(0,7) === 'digraph') return dot

  return plain
  ? `digraph G { bgcolor=transparent; ${colorDot(dot)} }`
  : `digraph G {
graph [fontname = "Indie Flower"];
node [fontname = "Indie Flower"];
edge [fontname = "Indie Flower"];
bgcolor=transparent;
overlap=false;
${colorDot(dot)} }`
}
// Supported layout engines
const engines = [ 'circo', 'dot', 'fdp', 'neato', 'osage', 'twopi' ]

const Dot = props => {

  // Extract code/caption from props
  const [code, caption] = props.children
  // Extract dot code from mdx
  const dot = wrapDot(code.props.children.props.children)

  // State and effect are needed to run async code as this
  // library always returns a promise
  const svgRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [reveal, setReveal] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [plain, setPlain] = useState(false)
  const [engine, setEngine] = useState(props.engine || 'dot')
  // Keep track of coarse calls
  const [rough, setRough] = useState(0)
  useEffect(() => {
    if (!reveal) {
      viz.renderString(dot, { engine }).then(res => {
        // Replace the default #000000 with currentColor for themeing
        setSvg(fixSvg(res))
        if (!plain && rough < 2) {
          coarse(svgRef.current)
          setRough(rough+1)
        }
        // Strip width/height so it's responsive
        if (svgRef.current.children?.[0]) {
          svgRef.current.children[0].attributes.width.value = ""
          svgRef.current.children[0].attributes.height.value = ""
          // Set style for theme support
          svgRef.current.children[0].setAttribute('stroke', "currentColor")
        }
      })
    }
  }, [dot, rough, plain, reveal, engine])

  const togglePlain = () => {
    setRough(0)
    setPlain(!plain)
  }
  const toggleReveal = () => {
    setRough(1)
    setReveal(!reveal)
  }
  const changeEngine = (eng) => {
    if (eng !== engine) {
      setRough(0)
      setEngine(eng)
    }
  }

  // Initialize viz library
  const viz = new Viz({ Module, render })

  return (
    <figure className="py-2">
      <div className="flex flex-row justify-center gap-8 mb-4">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold">plain</span>
          <input
            type="checkbox" className="toggle toggle-xs toggle-primary"
            checked={!plain} onChange={togglePlain}
            disabled={reveal}
          />
          <span style={{fontFamily: "Indie Flower"}}
            className="font-bold text-sm">sketch</span>
        </div>
        <div className={`dropdown dropdown-end`}>
          <div tabIndex="0" className="m-0 btn btn-ghost btn-xs flex flex-row gap-2">
                <span className="capitalize">Layout: {engine}</span>
          </div>
          <ul tabIndex="0" className="shadow menu dropdown-content bg-base-100 rounded-lg border p-0 py-2 pl-0">
            {engines.map(eng => (
              <li key={eng}>
                <button
                  onClick={() => changeEngine(eng)}
                  className="btn btn-ghost btn-xs hover:bg-base-200 px-4 py-1"
                >
                  <span className="text-xs">{eng}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold">graph</span>
          <input
            type="checkbox" className="toggle toggle-xs toggle-primary"
            checked={reveal} onChange={toggleReveal}
          />
          <span className="font-bold text-xs">code</span>
        </div>
      </div>

      {reveal
        ? (
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
              >
              {dot}
            </pre>
          </>
        ) : (
          <div
            className={zoom ? `fixed top-0 left-0 right-0 w-screen h-screen
               bg-base-100 bg-opacity-90 z-30 hover:cursor-zoom-out
               p-12 flex flex-col justify-center` : ''}
            onClick={() => zoom ? setZoom(false) : null}
          >
            <div
              ref={svgRef}
              onClick={() => setZoom(!zoom)}
              className={zoom
                ? 'svg-zoom'
                : "dot shadow p-2 rounded -mt-8 hover:cursor-zoom-in text-base-content"
              }
              dangerouslySetInnerHTML={{__html: svg}}
            />
            <figcaption className="text-center -mt-2 italic">
              {caption || ''}
            </figcaption>
          </div>
        )}
    </figure>
  )
}

export default Dot


