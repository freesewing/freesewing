// Components
import { SectionsMenu, ns as sectionsNs } from 'shared/components/navigation/sections-menu.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'

export const ns = sectionsNs

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
        <div className="w-full">
          <SectionsMenu />
          <ChoiceLink href="/sitemap" title="Sitemap">
            The sitemap lists all pages on this website. It can give you a good idea of what you can
            find here.
          </ChoiceLink>
        </div>
      </div>
    </div>
  </ModalWrapper>
)
