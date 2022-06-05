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


const Design = ({ design }) => {
  const { t } = useTranslation(['patterns'])
  const {
    code="Anonymous",
    difficulty=3,
  } = configs[design]
  const designer = configs[design].design || "Anonymous"
  const people = new Set()
  for (const contrib of ['design', 'code']) {
    if (Array.isArray(configs[design][contrib])) {
      for (const person of configs[design][contrib]) people.add(person)
    } else people.add(configs[design][contrib])
  }

  const [examples, setExamples] = useState([])

  useEffect(async () => {
    // Strapi filtering syntax
    const url = `${strapiHost}/showcaseposts?_locale=en&_sort=date:DESC` +
      `&_where[_or][0][design1_eq]=${design}` +
      `&_where[_or][1][design2_eq]=${design}` +
      `&_where[_or][2][design3_eq]=${design}` +
      `&_limit=6`
    await fetch(url)
      .then(response => response.json())
      .then(data => setExamples(data.map(post => ({
        slug: `/showcase/${post.slug}`,
        img: `${strapiHost}${post.image.formats.thumbnail.url}`,
        title: post.title
      }))))
      .catch(err => console.log(err))
  }, [ design ])

  return (
    <div className={`
      my-8
      aspect-[9/16]
      w-96
      shadow-lg
      border
      rounded-lg
      flex flex-col
      text-center
      overflow-clip
      relative
      `} style={{
      backgroundImage: `url('/img/designs/${design}.png')`,
      backgroundSize: 'contain',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
    }}>
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
      {/* People who did the Design/Code */}
      <div className="flex flex-row items-center justify-start max-w-2/3 pt-2 pl-1">
        <span className="text-base-content font-sm talic ml-2 p-2 bg-base-100 rounded-lg bg-opacity-60 p-0 m-0 px-1">
          {[...people].map(person => person).join(' / ')}
        </span>
      </div>
      <div className="grow"></div>
      <div className="bg-neutral bg-opacity-50 p-4 text-neutral-content" style={{
        textShadow: "1px 1px 2px black",
        color: 'white'
      }}>
        <h2 className="text-neutral-content m-0 p-0">{t(`${design}.t`)}</h2>
        <div className="text-neutral-content m-0 p-0 font-bold text-lg">{t(`${design}.d`)}</div>
      </div>
      <div className="my-4 z-10">
        <Worm list={examples} fixed/>
      </div>
    </div>
  )
}

export default Design
