import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ModalThemePicker } from 'shared/components/modal/theme-picker.mjs'
import { ModalLocalePicker } from 'shared/components/modal/locale-picker.mjs'
import { CloseIcon, MenuIcon, HelpIcon, DocsIcon } from 'shared/components/icons/close.js'
import { Ribbon } from 'shared/components/ribbon.js'
import { WordMark } from 'shared/components/wordmark.js'
import { useTranslation } from 'next-i18next'

const btnClasses =
  'btn btn-ghost text-base font-medium btn-sm text-neutral-content ' +
  ' capitalize hover:bg-transparent hover:text-secondary-focus'

export const Header = ({ app }) => {
  const { t } = useTranslation(['common'])

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
            <div className="hidden md:flex flex-row items-center">
              <a role="button" className={btnClasses} href="https://freesewing.dev/">
                <DocsIcon />
                <span className="ml-2">{t('docs')}</span>
              </a>
              <Link href="/support" role="button" className={btnClasses}>
                <>
                  <HelpIcon />
                  <span className="ml-2">{t('support')}</span>
                </>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex flex-row items-center gap-2">
            <ModalThemePicker app={app} />
            <ModalLocalePicker app={app} />
          </div>
        </div>
      </div>
      <Ribbon loading={app.loading} theme={app.theme} />
    </header>
  )
}
