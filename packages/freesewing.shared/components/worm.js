import Link from 'next/link'

const linkClasses = fixed => fixed
  ? `w-16 h-16 aspect-square block`
  : "w-12 h-12 md:w-14 md:h-14 xl:w-20 xl:h-20 aspect-square block"

const PreviewTile = ({ img, slug, title, href=false, fixed=false }) => (
  <div
    style={{
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      width: fixed ? '4rem' : 'inherit',
      height: fixed ? '4rem' : 'inherit',
    }}
    className={
      'rounded-full border-base-200 ' +
      'hover:border-0 shrink-0 border-4 hover:border aspect-square ' +
      (fixed
        ? `w-16 -ml-4 `
        : `w-12 -ml-4
            md:w-14 md:-ml-4 md:border-6 md:hover:border-2
            xl:w-20 xl:-ml-6 xl:border-6 xl:hover:border-2
            mb-2 xl:mb-4`
      )}
  >
    {href
      ? <a href={href} title={title} className={linkClasses(fixed)}/>
      : <Link href={slug}><a title={title} className={linkClasses(fixed)}/></Link>
    }
  </div>
)

const Worm = ({ list, fixed=false }) => {
  return (
    <div className={
      'flex flex-row flex-wrap items-center justify-center m-auto' +
      (fixed
        ? '-mr-8 pl-8 pr-8'
        : '-mr-8 pl-8 pr-8 md:-mr-12 md:pl-12'
      )
    }>
      {list.map(item => <PreviewTile {...item} fixed={fixed}/>)}
    </div>
  )
}

export default Worm
