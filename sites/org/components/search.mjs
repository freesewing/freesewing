import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, Highlight, Snippet } from 'react-instantsearch-hooks-web'
import { siteConfig } from 'site/site.config.mjs'
import Link from 'next/link'
import { ClearIcon, DesignIcon, DocsIcon } from 'shared/components/icons.mjs'

export const ns = ['search']

const icons = {
  docs: <DocsIcon className="w-8 h-8 text-secondary" />,
  design: <DesignIcon className="w-8 h-8 text-accent" />,
}

const searchClient = algoliasearch(siteConfig.algolia.appId, siteConfig.algolia.apiKey)

const Hit = (props) => (
  <div
    className={`
      px-2 py-1 ounded mt-1
      text-base text-base-content
      sm:rounded
      lg:px-4 lg:py-2
      border border-solid border-secondary
      bg-secondary bg-opacity-10
      hover:bg-secondary hover:bg-opacity-30
    `}
  >
    <Link href={props.hit.page} className="flex flex-row justify-between gap-2">
      <span className="text-base sm:text-xl font-bold leading-5">
        {props.hit._highlightResult?.title ? (
          <Highlight hit={props.hit} attribute="title" />
        ) : (
          props.hit.title
        )}
      </span>
      {icons[props.hit.type]}
    </Link>
    {props.hit._snippetResult?.body?.value ? (
      <Link href={props.hit.page} className="text-sm sm:text-base block py-1">
        <Snippet hit={props.hit} attribute="body" />
      </Link>
    ) : (
      <Link href={props.hit.page} className="text-xs sm:text-sm block opacity-70">
        <Highlight hit={props.hit} attribute="body" />
      </Link>
    )}
    <Link href={props.hit.page} className="text-xs sm:text-sm block opacity-70">
      <Highlight hit={props.hit} attribute="page" />
    </Link>
  </div>
)

export const Search = ({ language }) => {
  return (
    <InstantSearch indexName={siteConfig.algolia.index(language)} searchClient={searchClient}>
      <SearchBox
        searchAsYouType={true}
        autoFocus={true}
        classNames={{
          root: 'relative mb-4',
          input: 'input lg:input-lg input-bordered input-neutral w-full pr-16',
          reset:
            'absolute right-0 top-0 rounded-l-none btn btn-neutral lg:btn-lg text-neutral-content',
          submit: 'absolute right-0 top-0 rounded-l-none btn btn-neutral lg:btn-lg',
        }}
        resetIconComponent={() => <ClearIcon />}
      />
      {/* Widgets */}
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}
