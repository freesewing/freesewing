import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { configs } from 'shared/designs/index.js'
import DesignIcon from 'shared/components/icons/design.js'
import Worm from 'shared/components/worm.js'
import { strapiHost } from 'shared/config/freesewing.mjs'
import Link from 'next/link'

const colors = {
  1: 'bg-pink-300',
  2: 'bg-green-400',
  3: 'bg-yellow-400',
  4: 'bg-orange-400',
  5: 'bg-red-400'
}
const Difficulty = ({ score=1 }) => {
  const icons = []
  for (let i=0;i<score;i++) {
    icons.push(<DesignIcon className={`w-8 h-8 -ml-3 text-gray-900`} />)
  }

  return icons
}

const loadDesign = async (design, setExamples) => {
  // Strapi filtering syntax
  const url = `${strapiHost}/showcaseposts?_locale=en&_sort=date:DESC` +
    `&_where[_or][0][design1_eq]=${design}` +
    `&_where[_or][1][design2_eq]=${design}` +
    `&_where[_or][2][design3_eq]=${design}` +
    `&_limit=5`
  await fetch(url)
    .then(response => response.json())
    .then(data => setExamples(data.map(post => ({
      slug: `/showcase/${post.slug}`,
      img: `${strapiHost}${post.image.formats.thumbnail.url}`,
      title: post.title
    }))))
    .catch(err => console.log(err))
}

const Design = ({ design }) => {
  const { t } = useTranslation(['patterns'])
  const {
    difficulty=3,
  } = configs[design]

  const [examples, setExamples] = useState([])

  useEffect(() => {
    loadDesign(design, setExamples)
  }, [ design, setExamples ])

  return (
    <div className={`
      my-8
      w-full sm:w-96
      shadow-lg
      border
      rounded-lg
      flex flex-col
      text-center
      overflow-clip
      relative
      `}
    >
      {/* Link over the entire card */}
      <Link href={`/designs/${design}`}>
        <a className="absolute top-0 right-0 w-full h-full" title={t(`${design}.t`)} />
      </Link>
      {/* Slanted corner ribbon with the difficulty */}
      <div className="absolute top-0 right-0">
        <div className={`w-96 -mr-36 mt-8 pl-2 flex flex-row justify-center ${colors[difficulty]}`}
          style={{ transform: "rotate(45deg)" }}
        >
          <Difficulty score={difficulty} />
        </div>
      </div>
      <h6 className="text-base-content m-0 pt-4 pl-4 text-left capitalize">{design}</h6>
      <div className={`grow aspect-[9/16] -mt-4
        `} style={{
        backgroundImage: `url('/img/designs/${design}.png')`,
        backgroundSize: 'contain',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
      }}>
      </div>
      <div className="px-4 text-base-content">
        <h2 className="text-base-content m-0 p-0 z-30">{t(`${design}.t`)}</h2>
        <div className="text-base-content m-0 p-0 font-bold text-lg">{t(`${design}.d`)}</div>
      </div>
      <div className="py-4 z-10">
        <Worm list={examples} fixed/>
      </div>
    </div>
  )
}

export default Design
