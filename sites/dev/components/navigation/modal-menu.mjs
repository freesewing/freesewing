import { SectionsMenu, ns as sectionsNs } from 'site/components/navigation/sections-menu.mjs'
import { ActiveSection, ns as primaryNs } from 'shared/components/navigation/primary.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { nsMerge } from 'shared/utils.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'

export const ns = nsMerge(primaryNs, sectionsNs)

export const ModalMenu = () => (
  <ModalWrapper flex="col" justify="top" slideFrom="left">
    <div className="max-w-full">
      <div
        className={`
      py-4 w-full m-auto
      flex flex-col-reverse gap-0 flex-wrap justify-between
      lg:max-w-6xl lg:flex-nowrap lg:gap-8 lg:flex-row
    `}
      >
        <div className="w-full lg:w-1/2">
          <h3>Content per role</h3>
          <SectionsMenu />
          <h3 className="mt-8">Content per documentation type</h3>
          <SectionsMenu bOnly />
        </div>
        <div className="w-full lg:w-1/2">
          <h3>You are here</h3>
          <ActiveSection bare />
          <h3 className="mt-8">Search & Sitemap</h3>
          <p>Cannot find what you are looking for?</p>
          <ChoiceLink href="/search" title="Search">
            If you cannot find what you are looking for but you know the key words, try our search.
          </ChoiceLink>
          <ChoiceLink href="/sitemap" title="Sitemap">
            The sitemap lists all pages on this website. It can give you a good idea of what you can
            find here.
          </ChoiceLink>
        </div>
      </div>
    </div>
  </ModalWrapper>
)
