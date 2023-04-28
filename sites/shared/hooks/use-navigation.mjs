import { useEffect, useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'

export const useNavigation = ({ page }) => {
  const all = useContext(NavigationContext)

  useEffect(() => {}, [page.path, page.t])

  return {
    title: page.t,
    slug: page.s,
    order: page.o,
  }
}
