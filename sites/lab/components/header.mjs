// Hooks
import { useState, useEffect } from 'react'
// Components
import { ThemePicker } from 'shared/components/theme-picker/index.mjs'
import { LocalePicker } from 'shared/components/locale-picker/index.mjs'
import { DesignPicker } from 'site/components/design-picker.mjs'
import { CloseIcon, MenuIcon } from 'shared/components/icons.mjs'
import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'

export const Header = ({ app }) => {
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
      `}
    >
      <div>
        <div className="p-2 flex flex-row justify-between text-neutral-content">
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
          {!app.standalone && (
            <div className="hidden md:flex flex-row items-center gap-2 grow">
              <DesignPicker app={app} />
            </div>
          )}
          <div className="hidden md:flex flex-row items-center gap-2">
            <ThemePicker app={app} />
            <LocalePicker app={app} />
          </div>
        </div>
      </div>
      <Ribbon loading={app.loading} theme={app.theme} />
    </header>
  )
}
