import { useState, useEffect } from 'react'
import { ThemePicker, ns as themeNs } from 'shared/components/theme-picker/index.mjs'
import { LocalePicker, ns as localeNs } from 'shared/components/locale-picker/index.mjs'
import { CloseIcon, MenuIcon, SearchIcon } from 'shared/components/icons.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'

export const ns = [...new Set([...themeNs, ...localeNs])]

export const Header = ({ app, setSearch }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const curScrollPos = typeof window !== 'undefined' ? window.pageYOffset : 0
        if (curScrollPos >= prevScrollPos) {
          if (show && curScrollPos > 20) setShow(false)
        } else setShow(true)
        setPrevScrollPos(curScrollPos)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, show])

  return (
    <header
      className={`
      fixed bottom-0 lg:bottom-auto lg:top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      ${
        show || app.loading
          ? ''
          : 'fixed bottom-0 lg:top-0 left-0 translate-y-20 lg:-translate-y-20'
      }
      drop-shadow-xl
    `}
    >
      <div className="m-auto md:px-8">
        <div className="p-0 flex flex-row gap-2 justify-between text-neutral-content items-center">
          <div className="flex flex-row items-center">
            <button
              className={`
                btn btn-sm
                text-neutral-content bg-transparent
                lg:hidden
                h-12
              `}
              onClick={app.togglePrimaryMenu}
            >
              {app.primaryMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className="hidden lg:block lg:pl-2">
              <WordMark />
            </div>
          </div>
          <div className="flex flex-row items-center lg:hidden">
            <WordMark />
          </div>
          <div className="flex flex-row items-center lg:hidden pr-2">
            <button onClick={() => setSearch(true)} className="btn btn-sm">
              <SearchIcon />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-row gap-2 grow"></div>
          <div className="hidden lg:flex flex-row items-center">
            <ThemePicker app={app} />
            <LocalePicker app={app} />
            <button
              className={`
                btn btn-ghost btn-sm h-12
                hidden lg:flex
                flex-row gap-4
                justify-between
                rounded-none
                hover:bg-neutral-focus
              `}
              onClick={() => setSearch(true)}
            >
              <SearchIcon />
              <kbd className="normal-case text-xs -ml-2 font-medium px-1.5 rounded opacity-80 border border-neutral-content">
                /
              </kbd>
            </button>
          </div>
        </div>
      </div>
      <Ribbon loading={app.loading} theme={app.theme} />
    </header>
  )
}
