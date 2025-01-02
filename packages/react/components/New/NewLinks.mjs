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
      'tw-p-8 tw--ml-4 tw--mr-4 md:tw-m-0 tw-rounded-none md:tw-rounded-xl ' +
      'md:tw-shadow hover:tw-bg-secondary tw-bg-base-200 hover:tw-bg-opacity-10 ' +
      'tw-w-full tw-max-w-lg hover:tw-no-underline',
  }

  const inner = (
    <>
      <h4 className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-w-full tw-m-0 tw-p-0 tw-text-inherit">
        <span>{title}</span>
        <Icon className="tw-w-12 tw-h-12 tw--mt-2" stroke={1.5} />
      </h4>
      <div
        className={`tw-normal-case tw-text-base tw-font-medium tw-text-left tw-pt-2 tw-text-inherit`}
      >
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
    <div className="tw-w-full tw-max-w-7xl">
      <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2 tw-gap-4 tw-mb-8">
        {Object.entries(newLinks).map(([href, link]) => (
          <NewLink key={href} href={href} {...link} />
        ))}
      </div>
    </div>
  )
}
