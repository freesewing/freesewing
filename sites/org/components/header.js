import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemePicker from 'shared/components/theme-picker.js'
import LocalePicker from 'shared/components/locale-picker.js'
import CloseIcon from 'shared/components/icons/close.js'
import MenuIcon from 'shared/components/icons/menu.js'
import SearchIcon from 'shared/components/icons/search.js'
import Ribbon from 'shared/components/ribbon.js'
import { WordMark } from 'shared/components/wordmark.js'

const Header = ({ app, setSearch }) => {
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
        <div className="p-2 flex flex-row gap-2 justify-between text-neutral-content items-center">
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
                hover:text-secondary-focus
                hover:bg-transparent
              `}
              onClick={() => setSearch(true)}
            >
              <SearchIcon />
              <span className="normal-case text-base font-medium">Ctrl K</span>
            </button>
          </div>
        </div>
      </div>
      <Ribbon loading={app.loading} theme={app.theme} />
    </header>
  )
}

export default Header
