import { SectionsMenu } from 'shared/components/navigation/sections-menu.mjs'
import { useTranslation } from 'next-i18next'
import { ActiveSection, ns as primaryNs } from 'shared/components/navigation/primary.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { NavLinks, Breadcrumbs } from 'shared/components/navigation/sitenav.mjs'
import { PageLink, Link } from 'shared/components/link.mjs'
import { PlusIcon } from 'shared/components/icons.mjs'

export const ns = primaryNs

export const ModalMenu = () => {
  const { t } = useTranslation(ns)

  return (
    <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="left">
      <div className="max-w-full">
        <div
          className={`
        py-4 lg:py-16 w-full m-auto
        flex flex-col-reverse gap-0 flex-wrap justify-between
        lg:max-w-6xl lg:flex-nowrap lg:gap-8 lg:flex-row
      `}
        >
          <div className="w-full lg:w-1/2">
            <Link href="/new" title={t('new')}>
              <div className="flex flex-col rounded bg-accent text-primary-content mb-2 shadow bg-opacity-90">
                <div className={`flex flex-row items-center justify-between pt-2 px-4`}>
                  <h6 className="text-inherit">{t('new')}</h6>
                  <PlusIcon className="w-10 h-10" />
                </div>
                <div
                  className={`font-medium text-base leading-5 text-left rounded-b pt-0 pb-4 px-4 `}
                >
                  {t('newAbout')}
                </div>
              </div>
            </Link>
            <SectionsMenu />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-row gap-2 mb-4 items-center justify-center">
              <PageLink href="/" txt={t('sections:home')} />
              <span>|</span>
              <PageLink href="/search" txt={t('sections:search')} />
              <span>|</span>
              <PageLink href="/sitemap" txt={t('sections:sitemap')} />
              <span>|</span>
              <PageLink href="/support" txt={t('sections:support')} />
            </div>
            <Breadcrumbs lead />
            <NavLinks />
            <ActiveSection bare />
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
