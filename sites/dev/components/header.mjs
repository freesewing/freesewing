// Hooks
import { useState, useEffect } from 'react'
// Components
import { ThemePicker } from 'shared/components/theme-picker/index.mjs'
import { CloseIcon, MenuIcon, SearchIcon } from 'shared/components/icons.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'

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
      ${show ? '' : 'fixed bottom-0 lg:top-0 left-0 translate-y-20 lg:-translate-y-20'}
      drop-shadow-xl
    `}
    >
      <div className="m-auto" style={{ maxWidth: '1800px' }}>
        <div className="p-2 flex flex-row gap-2 justify-between text-neutral-content">
          <div className="flex flex-row items-center">
            <button
              className={`
                  btn btn-sm btn-ghost
                  text-neutral-content bg-transparent
                  hover:text-secondary-focus
                  lg:hidden
                `}
              onClick={app.togglePrimaryMenu}
            >
              {app.primaryMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className="hidden lg:block">
              <WordMark />
            </div>
          </div>
          <div className="flex flex-row items-center lg:hidden">
            <WordMark />
          </div>
          <div className="flex flex-row items-center lg:hidden pr-2">
            <button
              onClick={() => setSearch(true)}
              className="btn btn-sm btn-ghost hover:text-secondary-focus"
            >
              <SearchIcon />
            </button>
          </div>
          <div className="hidden lg:flex flex-row items-center">
            <button
              className={`
                btn btn-ghost btn-sm h-12
                hidden lg:flex
                flex-row gap-4
                justify-between
                hover:text-secondary-focus
                hover:bg-transparent
              `}
              onClick={() => setSearch(true)}
            >
              <SearchIcon />
              <span className="normal-case text-base font-medium">Ctrl K</span>
            </button>
            <ThemePicker app={app} />
          </div>
        </div>
      </div>
      <Ribbon loading={app.loading} theme={app.theme} />
    </header>
  )
}
