import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import algoliasearch from 'algoliasearch/lite';
import { useHotkeys } from 'react-hotkeys-hook'
import { InstantSearch, connectHits, connectHighlight, connectSearchBox } from 'react-instantsearch-dom'
import config from 'site/freesewing.config'
import H1 from 'shared/components/elements/h1'
import Button from 'shared/components/elements/button'

const searchClient = algoliasearch(config.search.id, config.search.key)

const Hits = props => {

  // When we hit enter in the text field, we want to navigate to the result
  // which means we must make the result links available in the input somehow
  // so let's stuff them in a data attribute
  const links = props.hits.map(hit => hit.path)
  props.input.current.setAttribute('data-links', JSON.stringify(links))

  return props.hits.map((hit, index) => (
    <Hit
      {...props}
      hit={hit}
      index={index}
      len={props.hits.length}
      activeLink={links[props.active]}
    />
  ))
}

const CustomHits = connectHits(Hits);

const Highlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return parsedHit.map((part, index) => part.isHighlighted
    ? <mark key={index}>{part.value}</mark>
    : <span key={index}>{part.value}</span>
  )
}

const CustomHighlight = connectHighlight(Highlight);

const Hit = props => (
  <div
    className={`
      mt-4 border-2 border-base-300 px-6 py-3 rounded-lg
      hover:bg-base-100 hover:text-base-content
      ${props.index === props.active
        ? 'bg-primary text-primary-content'
        : ''
        }
    `}
  >
    <Link href={props.hit.path}>
      <a href={props.hit.path}>
        <h4 className="text-2xl">
          {props.hit?._highlightResult?.title
            ? <CustomHighlight hit={props.hit} attribute='title' />
            : props.hit.title
          }
        </h4>
        <p className="tet-lg">
          /
          <b className="font-bold px-1 text-lg">
            {props.hit.path.split('/')[1]}
          </b>
          /
          {props.hit.path.split('/').slice(2).join('/')}
        </p>
      </a>
    </Link>
  </div>
)

// We use this for trapping ctrl-c
let prev
const handleInputKeydown = (evt, setSearch, setActive, active, router) => {
  if (evt.key === 'Escape') setSearch(false)
  if (evt.key === 'ArrowDown') setActive(act => act + 1)
  if (evt.key === 'ArrowUp') setActive(act => act - 1)
  if (evt.key === 'c' && prev === 'Control') evt.target.value = ''
  if (evt.key === 'Enter') {
    // Trigger navigation
    if (evt?.target?.dataset?.links) {
      router.push(JSON.parse(evt.target.dataset.links)[active])
      setSearch(false)
    }
  }
}

const SearchBox = props => {

  const input = useRef(null)
  const router = useRouter()
  useHotkeys('ctrl+x', () => {
    input.current.value = ''
  })
  if (input.current && props.active < 0) input.current.focus()

  const { currentRefinement, isSearchStalled, refine, setSearch, setActive } = props

  return (
    <form noValidate action="" role="search" onSubmit={(evt) => evt.preventDefault()}>
      <div className="form-control">
        <label className="label hidden lg:block">
          <span className="label-text">
            <b> Escape</b> to exit
            <span className="px-4">|</span>
            <b> Up</b> or <b>Down</b> to select
            <span className="px-4">|</span>
            <b> Enter</b> to navigate
            <span className="px-4">|</span>
            <b> Ctrl+c</b> to clear
          </span>
        </label>
        <div className="relative">
          <input
            ref={input}
            type="search"
            autoFocus={true}
            value={currentRefinement}
            onChange={event => refine(event.currentTarget.value)}
            onKeyDown={(evt) => handleInputKeydown(evt, setSearch, setActive, props.active, router)}
            className="input input-lg input-borderd input-primary w-full pr-16"
            placeholder='Type to search'
          />
          <button
            className="absolute right-0 top-0 rounded-l-none btn btn-primary btn-lg"
            onClick={() => props.setSearch(false)}
          >X</button>
        </div>
      </div>
      {
        input.current
        && input.current.value.length > 0
        && <CustomHits hitComponent={Hit} {...props} input={input}/>
      }
    </form>
  )
}

const CustomSearchBox = connectSearchBox(SearchBox);

const Search = props => {

  const [active, setActive] = useState(-1)
  useHotkeys('esc', () => props.setSearch(false))
  useHotkeys('up', () => {
    if (active) setActive(act => act - 1)
  })
  useHotkeys('down', () => {
    setActive(act => act + 1)
  })
  useHotkeys('down', () => {
    console.log('enter', active)
  })

  const stateProps = {
    setSearch: props.setSearch,
    active, setActive
  }

  return (
    <div className="max-w-prose m-auto">
      <H1>Search</H1>
      <InstantSearch indexName={config.search.index} searchClient={searchClient}>
        <div>
          <CustomSearchBox {...stateProps}/>
        </div>
      </InstantSearch>
    </div>
  )
}

export default Search
