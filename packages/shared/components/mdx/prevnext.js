const pageFromHref = (href, pages) => pages?.[href.slice(1)]

const getNext = (href, pages) => {
  const page = pageFromHref(href, pages)
  console.log(page)
  if (!page) return null
  if (page.offspring) return pages[page.offspring[0]]
}

const Next = page =>
const ReadMore = props => {

  return (
    <>
      <pre>{JSON.stringify(getNext(props.href, props.pages), null, 2)}</pre>
      <pre>{JSON.stringify(props.pages, null, 2)}</pre>
    </>
  )
}

export default ReadMore
