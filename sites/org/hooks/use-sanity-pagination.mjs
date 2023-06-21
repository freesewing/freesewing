import { useState, useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai-location'
import { sanityLoader } from 'site/components/sanity/utils.mjs'

const pageAtom = atomWithHash('page', 1, { delayInit: true })
const perPage = 12

export const useSanityPagination = (type, language) => {
  // const
  const [mounted, setMounted] = useState(false)
  // const [nav, setNav] = useState({})
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useAtom(pageAtom)
  const cache = useRef([])

  useEffect(() => {
    if (!mounted) {
      const fetchCount = async () => {
        const count = await sanityLoader({ query: `count(*[_type == "${type}${language}"])` })
        setTotalPages(Math.ceil(count / perPage))
        setMounted(true)
      }

      fetchCount()
      return
    }

    const fetchPage = async () => {
      let query = `*[_type == "${type}${language}"] | order(date desc) [${perPage * (page - 1)}...${
        perPage * page
      }] {_id, date, slug, title, ${type === 'blog' ? 'author' : 'maker'}, image}`

      const fetched = await sanityLoader({ query })
      setPosts(fetched)
      cache.current[page] = fetched
    }

    if (cache.current[page]) {
      setPosts(cache.current[page])
    } else {
      fetchPage(page)
    }
  }, [mounted, setMounted, page, type, language, setPosts])

  return { posts, page, totalPages, setPage }
}
