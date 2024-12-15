// Hooks
import React, { useState, useEffect } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as DefaultLink } from '@freesewing/react/components/Link'
import {
  NewMeasurementsSetIcon,
  NewPatternIcon,
  ShowcaseIcon,
  KioskIcon,
} from '@freesewing/react/components/Icon'

const NewLink = ({ title, Icon, description, href, Link }) => {
  if (!Link) Link = DefaultLink
  const linkProps = {
    href,
    className:
      'p-8 -ml-4 -mr-4 md:m-0 rounded-none md:rounded-xl md:shadow hover:bg-secondary bg-base-200 hover:bg-opacity-10 w-full max-w-lg hover:no-underline',
  }

  const inner = (
    <>
      <h4 className="flex flex-row items-start justify-between w-full m-0 p-0 text-inherit">
        <span>{title}</span>
        <Icon className="w-12 h-12 -mt-2" stroke={1.5} />
      </h4>
      <div className={`normal-case text-base font-medium text-left pt-2 text-inherit`}>
        {description}
      </div>
    </>
  )

  return <a {...linkProps}>{inner}</a>
  return <Link {...linkProps}>{inner}</Link>
}

const newLinks = {
  pattern: {
    Icon: NewPatternIcon,
    title: 'Generate a new pattern',
    description:
      'Pick a design, add your measurements set, and we will generate a bespoke sewing pattern for you.',
  },
  set: {
    Icon: NewMeasurementsSetIcon,
    title: 'Create new measurements set',
    description:
      'Create a new set of measurements which you can then use to generate patterns for.',
  },
  showcase: {
    Icon: ShowcaseIcon,
    title: 'Create a new showcase post',
    description:
      'Made something from a FreeSewing pattern? Please share the results here to inspire others.',
  },
  img: {
    Icon: KioskIcon,
    title: 'Generate a social media image',
    description:
      'Share the FreeSewing love on social media, supports wide, square, and tall formats.',
  },
}

/**
 * The NewLinks component shows all of the links to create something new
 *
 * @param {object} props - All the React props
 * @param {function} Link - A custom Link component, typically the Docusaurus one, but it's optional
 */
export const NewLinks = ({ Link = false }) => {
  // Use custom Link component if available
  if (!Link) Link = DefaultLink

  // Hooks
  const { account } = useAccount()

  return (
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        {Object.entries(newLinks).map(([href, link]) => (
          <NewLink key={href} href={href} {...link} />
        ))}
      </div>
    </div>
  )
}
