import Link from 'next/link'

const PreviewTile = ({ img, slug, title }) => (
  <div
    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
    className={`
      rounded-full inline-block border-neutral hover:border-0 shrink-0
      border-4 hover:border w-12 h-12 -ml-4
      md:w-14 md:h-14 md:-ml-4 md:border-6 md:hover:border-2
      xl:w-20 xl:h-20 xl:-ml-6 xl:border-6 xl:hover:border-2
      mb-2 xl:mb-4
    `}
  >
    <Link href={`/showcase/${slug}`}>
      <a className="w-12 h-12 block" title={title}/>
    </Link>
  </div>
)

const Worm = ({ list, size=20 }) => {
  return (
    <div className={`
      flex flex-row flex-wrap items-center justify-center
      -mr-8 pl-8 pr-8
      md:-mr-12 md:pl-12
    `}>
      {list.map(item => <PreviewTile {...item} />)}
    </div>
  )
}

export default Worm
