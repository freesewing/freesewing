// Dependencies
import { measurements } from '@freesewing/config'
import { cloudflareImageUrl, capitalize } from '@freesewing/utils'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'
// Hooks
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, PlusIcon, TrashIcon, UploadIcon } from '@freesewing/react/components/Icon'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { NewSet } from './Set.mjs'

/*
 * The component for the an account/sets page
 *
 * @param {object} props - All React props
 * @param {function} Link - An optional framework-specific Link component
 */
export const Sets = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { control } = useAccount()
  const backend = useBackend()

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

  // Context
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)
  const { setModal } = useContext(ModalContext)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const [status, body] = await backend.getSets()
      if (status === 200 && body.result === 'success') setSets(body.sets)
    }
    getSets()
  }, [refresh])

  // Helper var to see how many are selected
  const selCount = Object.keys(selected).length

  // Helper method to toggle single selection
  const toggleSelect = (id) => {
    const newSelected = { ...selected }
    if (newSelected[id]) delete newSelected[id]
    else newSelected[id] = 1
    setSelected(newSelected)
  }

  // Helper method to toggle select all
  const toggleSelectAll = () => {
    if (selCount === sets.length) setSelected({})
    else {
      const newSelected = {}
      for (const set of sets) newSelected[set.id] = 1
      setSelected(newSelected)
    }
  }

  // Helper to delete one or more measurements sets
  const removeSelectedSets = async () => {
    let i = 0
    for (const id in selected) {
      i++
      await backend.removeSet(id)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={selCount} msg="Removing measurements sets" key="linter" />,
      ])
    }
    setSelected({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'Nailed it', true, true])
  }

  return (
    <div className="tw-max-w-7xl xl:tw-pl-4">
      {sets.length > 0 ? (
        <>
          <p className="tw-text-center md:tw-text-right">
            <Link
              className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline tw-capitalize tw-w-full md:tw-w-auto tw-mr-2 tw-mb-2 hover:tw-no-underline hover:tw-text-primary-content"
              bottom
              primary
              href="/account/import"
            >
              <UploadIcon />
              Import Measurements Sets
            </Link>
            <button
              className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize tw-w-full md:tw-w-auto hover:tw-no-underline hover:tw-text-primary-content"
              onClick={() =>
                setModal(
                  <ModalWrapper keepOpenOnClick>
                    <NewSet />
                  </ModalWrapper>
                )
              }
            >
              <PlusIcon />
              Create a new Measurements Set
            </button>
          </p>
          <div className="tw-flex tw-flex-row tw-gap-2 tw-border-b-2 tw-mb-4 tw-pb-4 tw-mt-8 tw-h-14 tw-items-center">
            <input
              type="checkbox"
              className="tw-daisy-checkbox tw-daisy-checkbox-secondary"
              onClick={toggleSelectAll}
              checked={sets.length === selCount}
            />
            <button
              className="tw-daisy-btn tw-daisy-btn-error"
              onClick={removeSelectedSets}
              disabled={selCount < 1}
            >
              <TrashIcon /> {selCount} Measurements Sets
            </button>
          </div>
        </>
      ) : (
        <Link
          className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize tw-w-full md:tw-w-auto tw-btn-lg hover:tw-no-underline hover:tw-text-primary-content"
          bottom
          primary
          href="/new/set"
        >
          <PlusIcon />
          Create a new Measurements Set
        </Link>
      )}
      <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-2">
        {sets.map((set, i) => (
          <div
            key={i}
            className={`tw-flex tw-flex-row tw-items-start tw-gap-1 tw-border-2
          ${
            selected[set.id]
              ? 'tw-border-solid tw-border-secondary'
              : 'tw-border-dotted tw-border-base-300'
          } tw-rounded-lg p-2`}
          >
            <label className="tw-w-8 tw-h-full tw-shrink-0">
              <input
                type="checkbox"
                checked={selected[set.id] ? true : false}
                className="tw-daisy-checkbox tw-daisy-checkbox-secondary"
                onClick={() => toggleSelect(set.id)}
              />
            </label>
            <div className="tw-w-full">
              <MsetCard
                control={control}
                href={`/account/data/sets/set?id=${set.id}`}
                set={set}
                size="md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * React component to display a (card of a) single measurements set
 *
 * @param {object} props - All React props
 * @param {function} Link - An optional framework-specific Link component
 * @param {string} design - The designs for which to check required measurements
 * @param {test} href - Where the set should link to
 * @param {function} onClick - What to do when clicking on a set
 * @param {object} set - The (data of the) measurements set
 * @param {string} size - Size of the card
 * @param {bool} useA - Whether to use an A tag or not
 */
export const MsetCard = ({
  Link = false,
  design = false,
  href = false,
  onClick = false,
  set,
  size = 'lg',
  useA = false,
}) => {
  if (!Link) Link = WebLink
  const sizes = {
    lg: 96,
    md: 52,
    sm: 36,
  }
  const s = sizes[size]

  const wrapperProps = {
    className: `tw-bg-base-300 tw-aspect-square tw-h-${s} tw-w-${s} tw-mb-2 tw-grow
      tw-mx-auto tw-flex tw-flex-col tw-items-start tw-text-center tw-justify-between tw-rounded-none md:tw-rounded shadow`,
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w500', id: set.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (!set.img || set.img === 'default-avatar')
    wrapperProps.style.backgroundPosition = 'bottom right'

  let icon = <span></span>
  let missingMeasies = ''
  let linebreak = ''
  const maxLength = 75
  if (design) {
    const [hasMeasies, missing] = hasRequiredMeasurements(
      designMeasurements[design],
      set.measies,
      true
    )
    const iconClasses = 'tw-w-8 tw-h-8 tw-p-1 tw-rounded-full tw--mt-2 tw--ml-2 tw-shadow'
    icon = hasMeasies ? (
      <OkIcon className={`${iconClasses} tw-bg-success tw-text-success-content`} stroke={4} />
    ) : (
      <NoIcon className={`${iconClasses} tw-bg-error tw-text-error-content`} stroke={3} />
    )
    if (missing.length > 0) {
      const translated = missing.map((m) => {
        return t(m)
      })
      let missingString = t('missing') + ': ' + translated.join(', ')
      if (missingString.length > maxLength) {
        const lastSpace = missingString.lastIndexOf(', ', maxLength)
        missingString = missingString.substring(0, lastSpace) + ', ' + t('andMore') + '...'
      }
      const measieClasses = 'tw-font-normal tw-text-xs'
      missingMeasies = <span className={`${measieClasses}`}>{missingString}</span>
      linebreak = <br />
    }
  }

  const inner = (
    <>
      {icon}
      <span className="tw-bg-neutral tw-text-neutral-content tw-px-4 tw-w-full tw-bg-opacity-50 tw-py-2 tw-rounded tw-rounded-t-none tw-font-bold tw-leading-5">
        {set.name}
        {linebreak}
        {missingMeasies}
      </span>
    </>
  )

  // Is it a button with an onClick handler?
  if (onClick)
    return (
      <button {...wrapperProps} onClick={() => onClick(set)}>
        {inner}
      </button>
    )

  // Returns a link to an internal page
  if (href && !useA)
    return (
      <Link {...wrapperProps} href={href}>
        {inner}
      </Link>
    )

  // Returns a link to an external page
  if (href && useA)
    return (
      <a {...wrapperProps} href={href}>
        {inner}
      </a>
    )

  // Returns a div
  return <div {...wrapperProps}>{inner}</div>
}
