import { Ribbon } from 'shared/components/ribbon.mjs'
import { WordMark } from 'shared/components/wordmark.mjs'
import { SocialIcons } from 'shared/components/social/icons.mjs'
import { Sponsors, ns as sponsorsNs } from 'shared/components/sponsors/index.mjs'
import { FreeSewingIcon } from 'shared/components/icons.mjs'
export const ns = ['footer', ...sponsorsNs]

export const Footer = ({ app }) => (
  <footer className="bg-neutral">
    <Ribbon />
    <div className="w-full sm:w-auto flex flex-col gap-2 items-center justify-center pt-12">
      <FreeSewingIcon className="w-24 lg:w-40 m-auto m-auto text-neutral-content" />
      <div className="mt-4">
        <WordMark />
      </div>
      <p className="text-neutral-content text-normal leading-5 text-center -mt-2 opacity-70">
        Come for the sewing patterns
        <br />
        Stay for the community
      </p>
    </div>

    <div className="w-full sm:w-auto flex flex-row flex-wrap gap-6 lg:gap-8 items-center justify-center px-8 py-14">
      <SocialIcons />
    </div>

    <div className="mt-8 py-8 px-8 flex flex-row gap-8 flex-wrap 2xl:flex-nowrap justify-around text-neutral-content py-10 border border-solid border-l-0 border-r-0 border-b-0 border-base-300">
      <Sponsors />
    </div>
  </footer>
)
