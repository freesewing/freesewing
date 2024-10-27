import React from 'react'
import { designs, designInfo } from '@site/src/lib/designs.mjs'
import { pluginInfo } from '@site/src/lib/plugins.mjs'
import { capitalize, optionsMenuStructure, optionType } from '@site/src/lib/utils.mjs'
import Link from '@docusaurus/Link'
import { lineDrawings } from '@freesewing/react-components/linedrawings'
import {
  designs as designTranslations,
  measurements as measurementTranslations,
  optiongroups as optionGroupTranslations,
} from '@site/src/lib/i18n.mjs'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

const five = [0, 1, 2, 3, 4]
const t = (str) => str

export const Difficulty = ({ score = 0, color = false }) => (
  <>
    {five.map((i) => (
      <span
        key={i}
        role="img"
        style={{
          padding: '0 1px 0 0 ',
          opacity: i < score ? 1 : 0.5,
          filter: i < score ? '' : 'grayscale(1)',
        }}
      >
        🧵
      </span>
    ))}
  </>
)

const Cols = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem' }}>
    {children}
  </div>
)

const Option = ({ id, option, design, i18n }) =>
  optionType(option) === 'constant' ? null : (
    <li key={option.name}>
      <Link href={`/docs/designs/${design}/options#${id.toLowerCase()}`}>{i18n?.o?.[id].t}</Link>
      <br />
      <small>{i18n?.o?.[id].d}</small>
    </li>
  )

const OptionGroup = ({ id, group, design, i18n }) => (
  <li key={id}>
    <b>{optionGroupTranslations[id] || id}</b>
    <ul className="list list-inside list-disc pl-2">
      {Object.entries(group).map(([sid, entry]) =>
        entry.isGroup ? (
          <OptionGroup id={sid} key={sid} t={t} group={entry} design={design} i18n={i18n} />
        ) : (
          <Option key={sid} id={sid} option={entry} design={design} i18n={i18n} />
        )
      )}
    </ul>
  </li>
)

export const SimpleOptionsList = ({ options, design, i18n }) => {
  const structure = optionsMenuStructure(options, {}, true)
  const output = []
  for (const [key, entry] of Object.entries(structure)) {
    const shared = { key, design, id: key, i18n }
    if (entry.isGroup) output.push(<OptionGroup {...shared} group={entry} />)
    else output.push(<Option {...shared} option={entry} />)
  }

  return <ul className="list list-inside pl-2 list-disc">{output}</ul>
}

const Info = ({ design, list }) => (
  <div
    style={{
      padding: '1rem 1.5rem 0',
      margin: '0 0 2rem',
      border: '1px solid #ccc',
      borderRadius: '0.75rem',
      boxShadow: '2px 2px 4px #0002',
      backgroundColor: 'var(--ifm-footer-background-color)',
    }}
  >
    <h2>About {capitalize(design)}</h2>
    <p>{designTranslations[design].d}</p>
    <ul style={{ margin: '1rem 0', padding: 0 }}>
      {list.map(({ emoji, href = false, text }) => (
        <li
          style={{
            listStyleType: 'none',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
          key={href}
        >
          <span role="img" style={{ fontSize: '125%', paddingRight: '1rem' }}>
            {emoji}
          </span>
          {href ? <a href={href}>{text}</a> : text}
        </li>
      ))}
    </ul>
  </div>
)

const Subtle = ({ children }) => (
  <small style={{ paddingLeft: '0.15rem', opacity: 0.8 }}>{children}</small>
)

export const DesignInfo = ({ design }) => {
  // Design
  const Design = designs[design][capitalize(design)]
  const config = Design.patternConfig
  const i18n = designs[design].i18n.en

  // Measurements
  const measies = { required: {}, optional: {} }
  if (config.measurements) {
    for (const m of config.measurements) measies.required[m] = m
  }
  if (config.optionalMeasurements) {
    for (const m of config.optionalMeasurements) measies.optional[m] = m
  }

  // Linedrawing
  const LineDrawing = lineDrawings[design]
    ? lineDrawings[design]
    : ({ className }) => <div className={className}></div>

  return (
    <>
      <Info
        design={design}
        list={[
          {
            emoji: '🤯',
            text: (
              <span>
                <Difficulty score={designInfo[design].difficulty} />
                <Subtle>( difficulty = {designInfo[design].difficulty}/5 )</Subtle>
              </span>
            ),
          },
          {
            emoji: '🏷️',
            text: (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {designInfo[design].tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ margin: '3px 0', padding: '0 2px', fontSize: '80%' }}
                    key={tag}
                  >
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  </span>
                ))}
                <Subtle>( {designInfo[design].tags.length} tags )</Subtle>
              </span>
            ),
          },
          {
            emoji: '🪡',
            text: (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {designInfo[design].techniques.map((tag) => (
                  <span style={{ margin: '3px 0', padding: '0 2px', fontSize: '80%' }}>
                    <span className="technique" key={tag}>
                      {tag}
                    </span>
                  </span>
                ))}
                <Subtle>( {designInfo[design].techniques.length} techniques )</Subtle>
              </span>
            ),
          },
          {
            emoji: '📐',
            text: (
              <span>
                {typeof designInfo[design].design === 'string' ? (
                  <span>{designInfo[design].design}</span>
                ) : (
                  designInfo[design].design.map((person, index) => (
                    <span key={person}>
                      {person}
                      {index < designInfo[design].design.length - 1 && (
                        <span key={`${person}_join`}>, </span>
                      )}
                    </span>
                  ))
                )}
                <Subtle>
                  ( designer{typeof designInfo[design].design === 'string' ? '' : 's'} )
                </Subtle>
              </span>
            ),
          },
          {
            emoji: '🧑‍💻',
            text: (
              <span>
                {typeof designInfo[design].code === 'string' ? (
                  <span>{designInfo[design].code}</span>
                ) : (
                  designInfo[design].map((person, index) => (
                    <span key={person}>
                      {person}
                      {index < designInfo[design].design.length - 1 && (
                        <span key={`${person}_join`}>, </span>
                      )}
                    </span>
                  ))
                )}
                <Subtle>
                  ( developer{typeof designInfo[design].code === 'string' ? '' : 's'} )
                </Subtle>
              </span>
            ),
          },
          {
            emoji: '💡',
            href: `/docs/designs/${design}/instructions/`,
            text: `Sewing Instructions for ${capitalize(design)}`,
          },
          {
            emoji: '✂️',
            href: `/docs/designs/${design}/instructions/`,
            text: `Generate a bespoke sewing pattern for ${capitalize(design)}`,
          },
          {
            emoji: '❤️',
            text: (
              <span>
                <span style={{ padding: '0 2px', fontSize: '80%' }}>
                  <span className="tag">#FreeSewing{capitalize(design)}</span>
                </span>
                <small style={{ paddingLeft: '0.15rem', opacity: 0.8 }}>
                  ( Hashtag for social media )
                </small>
              </span>
            ),
          },
        ]}
      />

      <Tabs>
        <TabItem value="linedrawing" label="Linedrawing">
          <div style={{ maxHeight: '400px', aspectRatio: '4/3' }}>
            <LineDrawing />
          </div>
        </TabItem>
        <TabItem value="meas" label="Measurements">
          <Cols>
            <div>
              <h4>Required Measurements</h4>
              <ul>
                {Object.keys(measies.required)
                  .sort()
                  .map((m) => (
                    <li key={m}>
                      <Link href={`/docs/measurements/${m.toLowerCase()}`}>
                        {measurementTranslations[m]}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            {Object.keys(measies.optional).length > 0 ? (
              <div>
                <h4>Optional Measurements</h4>
                <ul>
                  {Object.keys(measies.optional)
                    .sort()
                    .map((m) => (
                      <li key={m}>
                        <Link href={`/docs/measurements/${m.toLowerCase()}`}>
                          {measurementTranslations[m]}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
          </Cols>
        </TabItem>
        {Object.keys(config.options).length > 0 ? (
          <TabItem value="desopts" label="Design Options">
            <SimpleOptionsList options={config.options} design={design} i18n={i18n} />
          </TabItem>
        ) : null}
        <TabItem value="parts" label="Design Parts">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {config.draftOrder.map((part) => (
                <tr key={part}>
                  <td style={{ textAlign: 'right' }}>
                    <code>{part}</code>
                  </td>
                  <td>{i18n.p[part.split('.').pop()]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabItem>
        {Object.keys(config.plugins).length > 0 ? (
          <TabItem value="plugins" label="Plugins used">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(config.plugins).map((plugin) => (
                  <tr key={plugin}>
                    <td style={{ textAlign: 'right' }}>
                      <a
                        target="_BLANK"
                        rel="nofollow"
                        href={`https://freesewing.dev/reference/plugins/${plugin
                          .split('/plugin-')
                          .pop()}`}
                      >
                        <code>{plugin}</code>
                      </a>
                    </td>
                    <td>{pluginInfo[plugin.split('/').pop()]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabItem>
        ) : null}
      </Tabs>
    </>
  )
}
