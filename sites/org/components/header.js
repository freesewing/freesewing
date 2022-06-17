import { useState, useEffect } from 'react'
import FreeSewingIcon from 'shared/components/icons/freesewing.js'
import Link from 'next/link'
import ThemePicker from 'shared/components/theme-picker.js'
import LocalePicker from 'shared/components/locale-picker.js'
import CloseIcon from 'shared/components/icons/close.js'
import MenuIcon from 'shared/components/icons/menu.js'
import SearchIcon from 'shared/components/icons/search.js'

const Right = props => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>
)
const Left = props => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
)

const Header = ({ app, setSearch }) => {

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const curScrollPos = (typeof window !== 'undefined') ? window.pageYOffset : 0
        if (curScrollPos >= prevScrollPos) {
          if (show && curScrollPos > 20) setShow(false)
        }
        else setShow(true)
        setPrevScrollPos(curScrollPos)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, show])


  return (
      <header className={`
        fixed top-0 left-0
        bg-neutral
        w-full
        z-30
        transition-transform
        ${show ? '': 'fixed top-0 left-0 -translate-y-20'}
        drop-shadow-xl
        ${app.loading ? "theme-gradient loading" : ""}
      `}>
        <div className="max-w-6xl m-auto">
          <div className="p-2 flex flex-row gap-2 justify-between text-neutral-content">
            <button
              className={`
                btn btn-sm
                text-neutral-content bg-transparent
                border border-transparent
                hover:bg-transparent hover:border-base-100
                md:hidden
                h-12
              `}
              onClick={app.togglePrimaryMenu}>
                {app.primaryMenu
                  ? (
                    <>
                      <CloseIcon />
                      <span className="opacity-50 pl-2 flex flex-row items-center gap-1">
                        <Left />
                        swipe
                      </span>
                    </>
                  ) : (
                    <>
                      <MenuIcon />
                      <span className="opacity-50 pl-2 flex flex-row items-center gap-1">
                        <Right />
                        swipe
                      </span>
                    </>
                  )
                }
            </button>
            <div className="flex flex-row items-center md:hidden pr-4">
              <button onClick={() => setSearch(true)} className="btn btn-sm">
                <SearchIcon />
              </button>
              <ThemePicker app={app} iconOnly />
              <LocalePicker app={app} iconOnly />
            </div>
            <button className={`
              btn btn-sm h-12
              hidden md:flex
              flex-row gap-1 mr-4 w-64 px-2
              bg-base-100 text-base-content
              hover:bg-base-100 hover:text-base-content
              justify-between
            `} onClick={() => setSearch(true)}>
              <div className="flex flex-row items-center gap-2">
              <SearchIcon />
              <span className="normal-case font-normal">Quick Search...</span>
              </div>
              <span className="normal-case">Ctrl K</span>
            </button>
            <div className="hidden md:flex md:flex-row gap-2">
              <Link href="/">
                <a className="flex flex-column items-center">
                  <FreeSewingIcon className="h-10 w-10"/>
                </a>
              </Link>
              <Link href="/">
                <a role="button" className="btn btn-link btn-sm text-neutral-content h-12 font-normal lowercase text-2xl">
                  <span className="font-black px-1 normal-case">FreeSewing</span>.org
                </a>
              </Link>
            </div>
            <div className="hidden md:flex flex-row items-center">
              <ThemePicker app={app} />
              <LocalePicker app={app} />
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header
