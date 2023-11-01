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

export const DesignCard = ({ name, linkTo = 'new', altLinkTo = 'docs', lineDrawing = false }) => {
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
        <div className={lineDrawing ? 'py-8 px-4' : 'py-8'}>
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

export const DesignDetail = ({ name, linkTo = 'new', altLinkTo = 'docs', lineDrawing = false }) => {
  const { t } = useTranslation(ns)

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
    <div>
      <div
        className={`flex flex-col flex-nowrap items-start justify-start gap-2 h-auto w-full
        btn btn-ghost border border-neutral p-0 border-b-none
        hover:border hover:border-secondary rounded-b-none
        relative`}
        style={bg}
      >
        <Link
          href={linkBuilders[linkTo](name)}
          className="w-full h-full before:absolute before:inset-y-0 before:inset-x-0"
        >
          <h5
            className={`flex flex-row items-center justify-between w-full w-full pt-2 px-4 rounded-t-lg m-0
          ${lineDrawing ? '' : 'bg-neutral text-neutral-content bg-opacity-70'}`}
          >
            <span>{t(`designs:${name}.t`)}</span>
            <span className="flex flex-col items-end">
              <span className="text-xs font-medium opacity-70">{t('tags:difficulty')}</span>
              <Difficulty score={designs[name].difficulty} />
            </span>
          </h5>
          <div className={lineDrawing ? 'py-8' : 'py-24'}>
            <LineDrawing className="h-64 max-w-full m-auto my-4 text-base-content" />
          </div>
        </Link>
        <div
          className={`pt-0 m-0 -mt-2 text-center w-full
        ${
          lineDrawing
            ? 'bg-transparent text-base-content'
            : 'bg-neutral text-neutral-content bg-opacity-70'
        }`}
        >
          <p className={`normal-case text-inherit font-medium text-center grow m-0 px-2`}>
            {t(`designs:${name}.d`)}
          </p>
          <div className="flex flex-row flex-wrap gap-2 relative z-10 px-2 items-center justify-center">
            {designs[name].tags.map((tag) => (
              <DesignTag key={tag} tag={tag} />
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-2 relative z-10 p-2 items-center justify-center">
            {designs[name].techniques.map((technique) => (
              <DesignTechnique key={technique} technique={technique} />
            ))}
          </div>
        </div>
      </div>
      {altLinkTo ? (
        <Link
          className="btn btn-secondary w-full rounded-t-none flex flex-row items-center justify-between px-4"
          href={linkBuilders[altLinkTo](name)}
        >
          {altLinkTo === 'docs' ? (
            <>
              <DocsIcon />
              <span>{t('learnMoreAboutThing', { thing: capitalize(name) })}</span>
            </>
          ) : (
            <>
              <NewPatternIcon />
              <span>{t('newThingPattern', { thing: capitalize(name) })}</span>
            </>
          )}
        </Link>
      ) : null}
    </div>
  )
}
