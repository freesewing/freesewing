import { SanityMdxWrapper } from './mdx-wrapper.mjs'
import { useTranslation } from 'next-i18next'

export const Author = ({ author = {} }) => {
  const { t } = useTranslation(['posts'])
  return (
    <div id="author" className="flex flex-col lg:flex-row m-auto p-2 items-center">
      <div className="theme-gradient w-40 h-40 p-2 rounded-full aspect-square hidden lg:block">
        <div
          className={`
          w-lg bg-cover bg-center rounded-full aspect-square
          hidden lg:block
        `}
          style={{ backgroundImage: `url(${author.image})` }}
        ></div>
      </div>

      <div className="theme-gradient p-2 rounded-full aspect-square w-40 h-40 lg:hidden m-auto">
        <img
          className={`block w-full h-full mx-auto rounded-full`}
          src={author.image}
          alt={author.displayname}
        />
      </div>
      <div
        className={`
        text-center p-2 px-4 rounded-r-lg bg-opacity-50
        lg:text-left
      `}
      >
        <p
          className="text-xl"
          dangerouslySetInnerHTML={{
            __html: t('xMadeThis', { x: author.displayname }),
          }}
        />
        <div className="prose mdx">
          <SanityMdxWrapper MDX={author.about} />
        </div>
      </div>
    </div>
  )
}
