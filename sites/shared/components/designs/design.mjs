// Dependencies
import { capitalize } from 'shared/utils.mjs'
import { linkClasses } from 'shared/components/link.mjs'
import { designImages } from 'shared/components/designs/examples.mjs'
import { designs } from 'shared/config/designs.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Link from 'next/link'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { lineDrawings } from 'shared/components/designs/linedrawings/index.mjs'
import { DocsIcon, NewPatternIcon } from 'shared/components/icons.mjs'
import { DesignInfo } from 'shared/components/designs/info.mjs'

export const ns = ['designs', 'tags', 'techniques']

export const linkBuilders = {
  new: (design) => `/new/${design.toLowerCase()}`,
  docs: (design) => `/docs/designs/${design.toLowerCase()}`,
}

export const DesignTechnique = ({ technique }) => {
  const { t } = useTranslation('techniques')

  return (
    <Link
      className="badge badge-accent hover:badge-secondary hover:shadow font-medium"
      href={`/designs/techniques/${technique}`}
    >
      {t(`techniques:${technique}`)}
    </Link>
  )
}

export const DesignTag = ({ tag }) => {
  const { t } = useTranslation(['tags'])

  return (
    <Link
      className="badge badge-primary hover:badge-secondary hover:shadow font-medium"
      href={`/designs/tags/${tag}`}
    >
      {t(tag)}
    </Link>
  )
}

export const DesignLink = ({ name, linkTo = 'new', className = linkClasses }) => (
  <Link href={linkBuilders[linkTo](name)} className={className}>
    {name}
  </Link>
)

export const DesignCard = ({ name, lineDrawing = false }) => {
  const { t } = useTranslation(ns)
  // Context
  const { setModal } = useContext(ModalContext)

  const LineDrawing =
    lineDrawing && lineDrawings[name]
      ? lineDrawings[name]
      : ({ className }) => <div className={className}></div>
  const exampleImageUrl = designImages[name]
    ? designImages[name]
    : 'https://images.pexels.com/photos/5626595/pexels-photo-5626595.jpeg?cs=srgb&dl=pexels-frida-toth-5626595.jpg&fm=jpg&w=640&h=427&_gl=1*vmxq7y*_ga*MTM0OTk5OTY4NS4xNjYxMjUyMjc0*_ga_8JE65Q40S6*MTY5NTU1NDc0Mi4yNS4xLjE2OTU1NTU1NjIuMC4wLjA.'

  const bg = lineDrawing
    ? {}
    : {
        backgroundImage: `url(${exampleImageUrl}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }

  return (
    <button
      onClick={() =>
        setModal(
          <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
            <h1>{t(`designs:${name}.t`)}</h1>
            <DesignInfo design={name} modal />
          </ModalWrapper>
        )
      }
    >
      <div
        className={`flex flex-col flex-nowrap items-start justify-start gap-2 h-80 w-full
        btn btn-ghost border border-neutral p-0 border-b-none
        hover:border hover:border-secondary
        relative`}
        style={bg}
      >
        <h5
          className={`text-center py-2 px-4 rounded-t-lg m-0 w-full
        ${lineDrawing ? '' : 'bg-neutral text-neutral-content bg-opacity-70'}`}
        >
          {t(`designs:${name}.t`)}
        </h5>
        <div className={lineDrawing ? 'p-4 grow w-full' : 'py-8'}>
          <LineDrawing className="h-64 max-w-full m-auto my-4 text-base-content" />
        </div>
        <div
          className={`pt-0 m-0 -mt-2 text-center w-full
        ${
          lineDrawing
            ? 'bg-transparent text-base-content'
            : 'bg-neutral text-neutral-content bg-opacity-70'
        }`}
        ></div>
      </div>
    </button>
  )
}
