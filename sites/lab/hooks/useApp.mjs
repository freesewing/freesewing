// Hooks
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/useTheme.mjs'
// Dependenices
import { designsByType } from 'prebuild/designs-by-type.mjs'
// Components
import { capitalize } from 'shared/utils.mjs'

// Initial navigation
const initialNavigation = (t) => {
  const base = {
    accessories: {
      __title: t('accessoryDesigns'),
      __slug: 'accessories',
    },
    blocks: {
      __title: t('blockDesigns'),
      __slug: 'blocks',
    },
    garments: {
      __title: t('garmentDesigns'),
      __slug: t('garments'),
    },
    utilities: {
      __title: t('utilityDesigns'),
      __slug: 'utilities',
    },
  }
  for (const type in designsByType) {
    for (const design in designsByType[type]) {
      base[type][design] = {
        __title: capitalize(design),
        __slug: design,
      }
    }
  }
  for (const key in base) {
    base[key].__order = base[key].__title
    base[key].__linktitle = base[key].__title
  }

  return base
}

const designs = {}
for (const type in designsByType) {
  designs[type] = []
  for (const design in designsByType[type]) {
    designs[type].push(design)
  }
}

export const useApp = () => {
  // Load translation method
  const locale = useRouter().locale
  const { t } = useTranslation(['app'])

  // Persistent state
  const [theme, setTheme] = useTheme()

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(initialNavigation(t))
  const [slug, setSlug] = useState('/')
  const [design, setDesign] = useState(false)
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)

  return {
    // Static vars
    site: 'lab',
    designs,

    // i18n
    locale,

    // State
    loading,
    navigation,
    design,
    primaryMenu,
    slug,
    theme,

    // State setters
    setLoading,
    setNavigation,
    setDesign,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => {
      setLoading(true)
      setPrimaryMenu(false)
    }, // Always close menu when navigating
    stopLoading: () => setLoading(false),

    // State handlers
    togglePrimaryMenu,

    // Standalone is for dev env
    standalone: false,
  }
}
