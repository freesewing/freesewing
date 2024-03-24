//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import {
  nsMerge,
  capitalize,
  optionsMenuStructure,
  optionType,
  cloudflareImageUrl,
  horFlexClasses,
} from 'shared/utils.mjs'
import { designs } from 'shared/config/designs.mjs'
import { examples } from 'site/components/design-examples.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useDesign } from 'site/hooks/use-design.mjs'
import { useContext, Fragment } from 'react'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { lineDrawings } from 'shared/components/designs/linedrawings/index.mjs'
import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { PageLink, AnchorLink, Link } from 'shared/components/link.mjs'
import { DocsLink, DocsTitle } from 'shared/components/mdx/docs-helpers.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { NewPatternIcon, DocsIcon } from 'shared/components/icons.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

// Translation namespaces used on this page
export const ns = nsMerge(
  'account',
  'tags',
  'techniques',
  'measurements',
  'workbench',
  'designs',
  'tags'
)

const Option = ({ id, option, design }) =>
  optionType(option) === 'constant' ? null : (
    <li key={option.name}>
      <DocsLink site="org" slug={`docs/designs/${design}/options/${id.toLowerCase()}`} />
    </li>
  )

const OptionGroup = ({ id, group, t, design }) => (
  <li key={id}>
    <b>{t(`workbench:${id}`)}</b>
    <ul className="list list-inside list-disc pl-2">
      {Object.entries(group).map(([sid, entry]) =>
        entry.isGroup ? (
          <OptionGroup id={sid} key={sid} t={t} group={entry} design={design} />
        ) : (
          <Option key={sid} id={sid} option={entry} design={design} />
        )
      )}
    </ul>
  </li>
)
export const SimpleOptionsList = ({ options, t, design }) => {
  const structure = optionsMenuStructure(options, {}, true)
  const output = []
  for (const [key, entry] of Object.entries(structure)) {
    const shared = { key, t, design, id: key }
    if (entry.isGroup) output.push(<OptionGroup {...shared} group={entry} />)
    else output.push(<Option {...shared} option={entry} />)
  }

  return <ul className="list list-inside pl-2 list-disc">{output}</ul>
}

export const DesignInfo = ({ design, docs = false, workbench = false, modal = false }) => {
  const { setModal } = useContext(ModalContext)
  const { t, i18n } = useTranslation([...ns, design])
  const { language } = i18n
  const Design = useDesign(design)
  const config = Design.patternConfig

  // Translate measurements
  const measies = { required: {}, optional: {} }
  if (config?.measurements) {
    for (const m of config.measurements) measies.required[m] = t(`measurements:${m}`)
  }
  if (config?.optionalMeasurements) {
    for (const m of config.optionalMeasurements) measies.optional[m] = t(`measurements:${m}`)
  }

  // Linedrawing
  const LineDrawing = lineDrawings[design]
    ? lineDrawings[design]
    : ({ className }) => <div className={className}></div>

  // Docs content
  const docsContent = (
    <>
      <h2 id="docs">{t('account:docs')}</h2>
      <ul className="list list-disc list-inside pl-2">
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/cutting`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/instructions`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/needs`} />
        </li>
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/fabric`} />
        </li>
        {Object.keys(config.options).length > 0 ? (
          <li>
            <DocsLink site="org" slug={`docs/designs/${design}/options`} />
          </li>
        ) : null}
        <li>
          <DocsLink site="org" slug={`docs/designs/${design}/notes`} />
        </li>
      </ul>
    </>
  )

  return (
    <>
      <h5 className="-mt-6 text-accent font-medium">#FreeSewing{capitalize(design)}</h5>
      <p className="text-xl">{t(`designs:${design}.d`)}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {workbench ? null : (
          <Link
            className={`${horFlexClasses} btn btn-primary btn-lg flex md:hidden`}
            href={`/new/${design}`}
          >
            <NewPatternIcon className="w-8 h-8" />
            {t('tags:newThingPattern', { thing: capitalize(design) })}
          </Link>
        )}
        {docs ? null : (
          <Link
            className={`${horFlexClasses} btn btn-secondary btn-lg flex md:hidden`}
            href={`/docs/designs/${design}`}
          >
            <DocsIcon className="w-8 h-8" />
            {t('account:docs')}
          </Link>
        )}
      </div>
      {docs || workbench || modal ? null : (
        <div className="flex flex-row flex-wrap gap-2 md:gap-4 items-center p-4 border rounded-lg bg-secondary bg-opacity-5 max-w-4xl">
          <b>Jump to:</b>
          <AnchorLink id="notes">
            <DocsTitle
              slug={`docs/designs/${design}/notes`}
              language={language}
              format={(t) => t.split(':').pop().trim()}
            />
          </AnchorLink>
          {examples && <AnchorLink id="examples" txt={t('acount:examples')} />}
          {['needs', 'fabric'].map((page) => (
            <AnchorLink id={page} key={page}>
              <DocsTitle
                slug={`docs/designs/${design}/${page}`}
                language={language}
                format={(t) => t.split(':').pop().trim()}
              />
            </AnchorLink>
          ))}
          <AnchorLink id="docs" txt={t('account:docs')} />
          <AnchorLink id="specs" txt={t('account:specifications')} />
        </div>
      )}

      <div className={`mt-8 w-full ${docs ? '' : 'flex flex-row flex-wrap justify-between'}`}>
        <div className={`w-full max-w-2xl ${docs ? '' : 'md:w-2/3 pr-0 md:pr-8'}`}>
          <LineDrawing className="w-full text-base-content" />
          {docs ? null : (
            <>
              <h2 id="notes">
                <DocsTitle
                  slug={`docs/designs/${design}/notes`}
                  language={language}
                  format={(t) => t.split(':').pop().trim()}
                />
              </h2>
              <DynamicMdx
                site="org"
                slug={`docs/designs/${design}/notes`}
                language={language}
                title={false}
              />
            </>
          )}
          {docs ? docsContent : null}
          {examples ? (
            <>
              <h2 id="examples">{t('account:examples')}</h2>
              {examples[design] ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3">
                  {examples[design].map((ex) => (
                    <button
                      key={ex}
                      onClick={() =>
                        setModal(
                          <ModalWrapper
                            flex="col"
                            justify="top lg:justify-center"
                            slideFrom="right"
                          >
                            <img
                              className="w-full shadow rounded-lg"
                              src={cloudflareImageUrl({ id: `showcase-${ex}`, variant: 'public' })}
                            />
                            <p className="text-center">
                              <PageLink href={`/showcase/${ex}`} txt={t('account:visitShowcase')} />
                            </p>
                          </ModalWrapper>
                        )
                      }
                    >
                      <img
                        className="w-full shadow rounded-lg"
                        src={cloudflareImageUrl({ id: `showcase-${ex}`, variant: 'sq500' })}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <Popout note>
                  <h5>{t('account:noExamples')}</h5>
                  <p>{t('account:noExamplesMsg')}</p>
                  <p className="text-right">
                    <Link className="btn btn-primary" href="/new/showcase">
                      {t('account:showcaseNew')}
                    </Link>
                  </p>
                </Popout>
              )}
            </>
          ) : null}
          {docs
            ? null
            : ['needs', 'fabric'].map((page) => (
                <Fragment key={page}>
                  <h2 id={page}>
                    <DocsTitle
                      slug={`docs/designs/${design}/${page}`}
                      language={language}
                      format={(t) => t.split(':').pop().trim()}
                    />
                  </h2>
                  <DynamicMdx
                    site="org"
                    slug={`docs/designs/${design}/${page}`}
                    language={language}
                    title={false}
                  />
                </Fragment>
              ))}

          {docs ? null : docsContent}
        </div>

        <div className={`w-full ${docs ? '' : 'md:w-1/3'}`}>
          {workbench ? null : (
            <Link
              className={`${horFlexClasses} btn btn-primary btn-lg hidden md:flex mb-2`}
              href={`/new/${design}`}
            >
              <NewPatternIcon className="w-8 h-8" />
              {t('tags:newThingPattern', { thing: capitalize(design) })}
            </Link>
          )}
          {docs ? null : (
            <Link
              className={`${horFlexClasses} btn btn-secondary btn-lg hidden md:flex`}
              href={`/docs/designs/${design}`}
            >
              <DocsIcon className="w-8 h-8" />
              {t('account:docs')}
            </Link>
          )}
          <h2 id="specs">{t('account:specifications')}</h2>

          <h6 className="mt-4">{t('account:design')}</h6>
          <ul>
            {designs[design].design.map((person) => (
              <li key={person}>{person}</li>
            ))}
          </ul>

          <h6 className="mt-4">{t('account:code')}</h6>
          <ul>
            {designs[design].code.map((person) => (
              <li key={person}>{person}</li>
            ))}
          </ul>

          <h6 className="mt-4">{t('tags:difficulty')}</h6>
          <Difficulty score={designs[design].difficulty} />

          <h6 className="mt-4">{t('tags:tags')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designs[design].tags.map((tag) => (
              <span className="badge badge-primary font-medium" key={tag}>
                {t(`tags:${tag}`)}
              </span>
            ))}
          </div>

          <h6 className="mt-4">{t('techniques:techniques')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designs[design].techniques.map((tech) => (
              <span className="badge badge-accent font-medium" key={tech}>
                {t(`techniques:${tech}`)}
              </span>
            ))}
          </div>

          {Object.keys(measies.required).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:requiredMeasurements')}</h6>
              <ul className="list list-disc list-inside pl-2">
                {Object.keys(measies.required)
                  .sort()
                  .map((m) => (
                    <li key={m}>
                      <PageLink
                        href={`/docs/measurements/${m.toLowerCase()}`}
                        txt={measies.required[m]}
                      />
                    </li>
                  ))}
              </ul>
            </>
          ) : null}

          {Object.keys(measies.optional).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:optionalMeasurements')}</h6>
              <ul className="list list-disc list-inside pl-2">
                {Object.keys(measies.optional)
                  .sort()
                  .map((m) => (
                    <li key={m}>
                      <PageLink
                        href={`/docs/measurements/${m.toLowerCase()}`}
                        txt={measies.optional[m]}
                      />
                    </li>
                  ))}
              </ul>
            </>
          ) : null}

          {Object.keys(config.options).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:designOptions')}</h6>
              <SimpleOptionsList options={config.options} t={t} design={design} />
            </>
          ) : null}

          <h6 className="mt-4">{t('account:parts')}</h6>
          <ul className="list list-disc list-inside pl-2">
            {config.draftOrder.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>

          {Object.keys(config.plugins).length > 0 ? (
            <>
              <h6 className="mt-4">{t('account:plugins')}</h6>
              <ul className="list list-disc list-inside pl-2">
                {Object.keys(config.plugins).map((plugin) => (
                  <li key={plugin}>{plugin}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
