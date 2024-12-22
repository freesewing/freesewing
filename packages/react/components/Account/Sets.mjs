// Dependencies
import { measurements } from '@freesewing/config'
import { cloudflareImageUrl, capitalize } from '@freesewing/utils'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
// Hooks
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { NoIcon, OkIcon, PlusIcon, TrashIcon, UploadIcon } from '@freesewing/react/components/Icon'

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
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState({})
  const [refresh, setRefresh] = useState(0)

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
    <div className="max-w-7xl xl:pl-4">
      {sets.length > 0 ? (
        <>
          <p className="text-center md:text-right">
            <Link
              className="daisy-btn daisy-btn-primary daisy-btn-outline capitalize w-full md:w-auto mr-2 mb-2 hover:no-underline hover:text-primary-content"
              bottom
              primary
              href="/account/import"
            >
              <UploadIcon />
              Import Measurements Sets
            </Link>
            <Link
              className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto hover:no-underline hover:text-primary-content"
              bottom
              primary
              href="/new/set"
            >
              <PlusIcon />
              Create a new Measurements Set
            </Link>
          </p>
          <div className="flex flex-row gap-2 border-b-2 mb-4 pb-4 mt-8 h-14 items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              onClick={toggleSelectAll}
              checked={sets.length === selCount}
            />
            <button
              className="daisy-btn daisy-btn-error"
              onClick={removeSelectedSets}
              disabled={selCount < 1}
            >
              <TrashIcon /> {selCount} Measurements Sets
            </button>
          </div>
        </>
      ) : (
        <Link
          className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto btn-lg hover:no-underline hover:text-primary-content"
          bottom
          primary
          href="/new/set"
        >
          <PlusIcon />
          Create a new Measurements Set
        </Link>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {sets.map((set, i) => (
          <div
            key={i}
            className={`flex flex-row items-start gap-1 border-2
          ${
            selected[set.id] ? 'border-solid border-secondary' : 'border-dotted border-base-300'
          } rounded-lg p-2`}
          >
            <label className="w-8 h-full shrink-0">
              <input
                type="checkbox"
                checked={selected[set.id] ? true : false}
                className="daisy-checkbox daisy-checkbox-secondary"
                onClick={() => toggleSelect(set.id)}
              />
            </label>
            <div className="w-full">
              <MsetCard control={control} href={`/account/set?id=${set.id}`} set={set} size="md" />
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
    className: `bg-base-300 aspect-square h-${s} w-${s} mb-2 grow
      mx-auto flex flex-col items-start text-center justify-between rounded-none md:rounded shadow`,
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
    const iconClasses = 'w-8 h-8 p-1 rounded-full -mt-2 -ml-2 shadow'
    icon = hasMeasies ? (
      <OkIcon className={`${iconClasses} bg-success text-success-content`} stroke={4} />
    ) : (
      <NoIcon className={`${iconClasses} bg-error text-error-content`} stroke={3} />
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
      const measieClasses = 'font-normal text-xs'
      missingMeasies = <span className={`${measieClasses}`}>{missingString}</span>
      linebreak = <br />
    }
  }

  const inner = (
    <>
      {icon}
      <span className="bg-neutral text-neutral-content px-4 w-full bg-opacity-50 py-2 rounded rounded-t-none font-bold leading-5">
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
