import React, { Fragment } from 'react'
import { designs, designInfo } from '@site/src/lib/designs.mjs'
import { capitalize, optionsMenuStructure, optionType } from '@site/src/lib/utils.mjs'
import Link from '@docusaurus/Link';

// Dependencies
//import {
//  nsMerge,
//  capitalize,
//  optionsMenuStructure,
//  optionType,
//  cloudflareImageUrl,
//  horFlexClasses,
//} from 'shared/utils.mjs'
//import { designs } from 'shared/config/designs.mjs'
//import { examples } from 'site/components/design-examples.mjs'
//// Hooks
//import { useTranslation } from 'next-i18next'
//import { useDesign } from 'site/hooks/use-design.mjs'
//import { useContext, Fragment } from 'react'
//// Context
//import { ModalContext } from 'shared/context/modal-context.mjs'
//// Components
//import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
//import { lineDrawings } from 'shared/components/designs/linedrawings/index.mjs'
//import { Difficulty } from 'shared/components/designs/difficulty.mjs'
//import { PageLink, AnchorLink, Link } from 'shared/components/link.mjs'
//import { DocsLink, DocsTitle } from 'shared/components/mdx/docs-helpers.mjs'
//import { Popout } from 'shared/components/popout/index.mjs'
//import { NewPatternIcon, DocsIcon } from 'shared/components/icons.mjs'
//import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'


const Option = ({ id, option, design }) =>
  optionType(option) === 'constant' ? null : (
    <li key={option.name}>
      <Link href={`/docs/designs/${design}/options/${id.toLowerCase()}`}>{id}</Link>
    </li>
  )

const OptionGroup = ({ id, group, design }) => (
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

export const SimpleOptionsList = ({ options, design }) => {
  const structure = optionsMenuStructure(options, {}, true)
  const output = []
  for (const [key, entry] of Object.entries(structure)) {
    const shared = { key, t, design, id: key }
    if (entry.isGroup) output.push(<OptionGroup {...shared} group={entry} />)
    else output.push(<Option {...shared} option={entry} />)
  }

  return <ul className="list list-inside pl-2 list-disc">{output}</ul>
}

const t = (str) => str

export const DesignInfo = ({ design }) => {
  const Design = designs[design][capitalize(design)]
  const config = Design.patternConfig
  console.log(designInfo[design])

  // Translate measurements
  const measies = { required: {}, optional: {} }
  if (config?.measurements) {
    for (const m of config.measurements) measies.required[m] = t(`measurements:${m}`)
  }
  if (config?.optionalMeasurements) {
    for (const m of config.optionalMeasurements) measies.optional[m] = t(`measurements:${m}`)
  }

  // Linedrawing
  //const LineDrawing = lineDrawings[design]
  //  ? lineDrawings[design]
  //  : ({ className }) => <div className={className}></div>

  // Docs content
  const docsContent = (
    <>
      <h2 id="docs">{t('account:docs')}</h2>
      <ul className="list list-disc list-inside pl-2">
        <li>
          {`docs/designs/${design}`}
        </li>
        <li>
          {`docs/designs/${design}/cutting`}
        </li>
        <li>
          {`docs/designs/${design}/instructions`}
        </li>
        <li>
          {`docs/designs/${design}/needs`}
        </li>
        <li>
          {`docs/designs/${design}/fabric`}
        </li>
        {Object.keys(config.options).length > 0 ? (
          <li>
            {`docs/designs/${design}/options`}
          </li>
        ) : null}
        <li>
          {`docs/designs/${design}/notes`}
        </li>
      </ul>
    </>
  )

  return (
    <>
      <h5 className="-mt-6 text-accent font-medium">#FreeSewing{capitalize(design)}</h5>
      <p className="text-xl">{t(`designs:${design}.d`)}</p>

      <div className={`mt-8 w-full flex flex-row flex-wrap justify-between`}>
        <div className={`w-full max-w-2xl md:w-2/3 pr-0 md:pr-8`}>
    {/* <LineDrawing className="w-full text-base-content" /> */}
    {docsContent}
        </div>

        <div>
            <Link
              className={`btn btn-primary btn-lg hidden md:flex mb-2`}
              href={`/new/${design}`}
            >
              {t('tags:newThingPattern', { thing: capitalize(design) })}
            </Link>
            <Link
              className={`btn btn-secondary btn-lg hidden md:flex`}
              href={`/docs/designs/${design}`}
            >
              {t('account:docs')}
            </Link>
          <h2 id="specs">{t('account:specifications')}</h2>

          <h6 className="mt-4">{t('account:design')}</h6>
          <ul>
            {typeof designInfo[design].design === 'string'
              ? <li>{designInfo[design].design}</li>
              : designInfo[design].design.map((person) => (
                  <li key={person}>{person}</li>
              ))
            }
          </ul>

          <h6 className="mt-4">{t('account:code')}</h6>
          <ul>
            {typeof designInfo[design].code === 'string'
              ? <li>{designInfo[design].code}</li>
              : designInfo[design].code.map((person) => (
                <li key={person}>{person}</li>
              ))
            }
          </ul>

          <h6 className="mt-4">{t('tags:difficulty')}</h6>
          {/*<Difficulty score={designInfo[design].difficulty} />*/}

          <h6 className="mt-4">{t('tags:tags')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designInfo[design].tags.map((tag) => (
              <span className="badge badge-primary font-medium" key={tag}>
                {t(`tags:${tag}`)}
              </span>
            ))}
          </div>

          <h6 className="mt-4">{t('techniques:techniques')}</h6>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {designInfo[design].techniques.map((tech) => (
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
                      <Link href={`/docs/measurements/${m.toLowerCase()}`}>
                        {measies.required[m]}
                      </Link>
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
                      <Link
                        href={`/docs/measurements/${m.toLowerCase()}`}>
                        {measies.optional[m]}
                    </Link>
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
