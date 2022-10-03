import { useState, useEffect } from 'react'
import FreeSewingIcon from 'shared/components/icons/freesewing.js'
import Link from 'next/link'
import ThemePicker from 'shared/components/theme-picker.js'
import CloseIcon from 'shared/components/icons/close.js'
import MenuIcon from 'shared/components/icons/menu.js'
import SearchIcon from 'shared/components/icons/search.js'
import Ribbon from 'shared/components/ribbon.js'

export const WordMark = () => (
  <Link href="/">
    <a
      role="button"
      className="btn btn-ghost btn-sm normal-case text-2xl hover:bg-transparent font-bold"
    >
      <span className="text-red-400">F</span>
      <span className="text-orange-400">r</span>
      <span className="text-yellow-400">e</span>
      <span className="text-lime-400">e</span>
      <span className="text-green-400">S</span>
      <span className="text-cyan-400">e</span>
      <span className="text-blue-400">w</span>
      <span className="text-indigo-400">i</span>
      <span className="text-violet-400">n</span>
      <span className="text-purple-400">g</span>
    </a>
  </Link>
)

const Right = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)
const Left = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
)

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
      fixed top-0 left-0
      bg-neutral
      w-full
      z-30
      transition-transform
      ${show ? '' : 'fixed top-0 left-0 -translate-y-20'}
      drop-shadow-xl
    `}
    >
      <div>
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
            <WordMark />
          </div>
          <div className="flex flex-row items-center lg:hidden pr-4">
            <button
              onClick={() => setSearch(true)}
              className="btn btn-sm btn-ghost hover:text-secondary-focus"
            >
              <SearchIcon />
            </button>
            <ThemePicker app={app} iconOnly />
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

export default Header
