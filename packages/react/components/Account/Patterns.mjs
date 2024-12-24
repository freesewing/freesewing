// Dependencies
import orderBy from 'lodash/orderBy.js'
import { capitalize, shortDate } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
//import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
import { useSelection } from '@freesewing/react/hooks/useSelection'

//import {
//  measurements,
//  isDegreeMeasurement,
//  control as controlConfig,
//  urls,
//} from '@freesewing/config'
//import { measurements as measurementTranslations } from '@freesewing/i18n'
//import { measurements as designMeasurements } from '@freesewing/collection'
//import {
//  cloudflareImageUrl,
//  capitalize,
//  formatMm,
//  horFlexClasses,
//  linkClasses,
//  notEmpty,
//  roundDistance,
//  shortDate,
//  timeAgo,
//} from '@freesewing/utils'

//// Hooks
//import React, { useState, useEffect, Fragment, useContext } from 'react'
//import { useAccount } from '@freesewing/react/hooks/useAccount'
//import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { TableWrapper } from '@freesewing/react/components/Table'
import { PatternCard } from '@freesewing/react/components/Account'
import { Link as WebLink } from '@freesewing/react/components/Link'
import {
  BoolNoIcon,
  BoolYesIcon,
  //  CloneIcon,
  //  CuratedMeasurementsSetIcon,
  //  EditIcon,
  //  ShowcaseIcon,
  //  NewMeasurementsSetIcon,
  //  NoIcon,
  //  OkIcon,
  PlusIcon,
  RightIcon,
  //  ResetIcon,
  TrashIcon,
  //  UploadIcon,
  //  //  WarningIcon,
  //  //  BoolYesIcon,
  //  //  BoolNoIcon,
} from '@freesewing/react/components/Icon'
//import { BookmarkButton, MsetCard } from '@freesewing/react/components/Account'
//import {
//  DesignInput,
//  MarkdownInput,
//  ListInput,
//  MeasieInput,
//  PassiveImageInput,
//  StringInput,
//  ToggleInput,
//} from '@freesewing/react/components/Input'
//import { DisplayRow } from './shared.mjs'
//import Markdown from 'react-markdown'
//import { ModalWrapper } from '@freesewing/react/components/Modal'
//import { Json } from '@freesewing/react/components/Json'
//import { Yaml } from '@freesewing/react/components/Yaml'
//import { Popout } from '@freesewing/react/components/Popout'

const t = (input) => {
  console.log('t called', input)
  return input
}

/*
 * Component for the account/patterns page
 *
 * @params {object} props - All React props
 * @params {function} Link - A framework specific Link component for client-side routing
 */
export const Patterns = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // State
  const [patterns, setPatterns] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [order, setOrder] = useState('id')
  const [desc, setDesc] = useState(false)

  // Hooks
  const backend = useBackend()
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)
  const { count, selection, setSelection, toggle, toggleAll } = useSelection(patterns)

  // Effects
  useEffect(() => {
    const getPatterns = async () => {
      setLoadingStatus([true, 'Loading patterns from backend'])
      const [status, body] = await backend.getPatterns()
      console.log({ status, body })
      if (status === 200) {
        setPatterns(body.patterns)
        setLoadingStatus([true, 'Patterns loaded', true, true])
      } else setLoadingStatus([false, 'Failed to load patterns from backend', true, true])
    }
    getPatterns()
  }, [refresh])

  // Helper to delete one or more patterns
  const removeSelectedPatterns = async () => {
    let i = 0
    for (const pattern in selection) {
      i++
      await backend.removePattern(pattern)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={count} msg="Removing patterns" key="linter" />,
      ])
    }
    setSelection({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'Nailed it', true, true])
  }

  const fields = {
    id: '#',
    img: 'Image',
    name: 'Name',
    design: 'Design',
    createdAt: 'Date',
    public: 'Public',
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-between mb-4">
        <button
          className="daisy-btn daisy-btn-error"
          onClick={removeSelectedPatterns}
          disabled={count < 1}
        >
          <TrashIcon /> {count} {t('patterns')}
        </button>
        <Link
          className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto hover:text-primary-content"
          href="/-/"
        >
          <PlusIcon />
          Create a new pattern
        </Link>
      </div>
      <TableWrapper>
        <table className="table table-auto">
          <thead className="border border-base-300 border-b-2 border-t-0 border-x-0">
            <tr className="">
              <th className="">
                <input
                  type="checkbox"
                  className="daisy-checkbox daisy-checkbox-secondary"
                  onClick={toggleAll}
                  checked={patterns.length === count}
                />
              </th>
              {Object.keys(fields).map((field) => (
                <th key={field}>
                  <button
                    className="daisy-btn daisy-btn-link capitalize px-0 underline hover:decoration-4 decoration-2 text-secondary"
                    onClick={() => (order === field ? setDesc(!desc) : setOrder(field))}
                  >
                    {fields[field]}{' '}
                    <RightIcon
                      stroke={3}
                      className={`w-4 h-4 ${desc ? '-' : ''}rotate-90 ${order === field ? '' : 'opacity-0'}`}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderBy(patterns, order, desc ? 'desc' : 'asc').map((pattern, i) => (
              <tr key={i}>
                <td className="text-base font-medium">
                  <input
                    type="checkbox"
                    checked={selection[pattern.id] ? true : false}
                    className="daisy-checkbox daisy-checkbox-secondary"
                    onClick={() => toggle(pattern.id)}
                  />
                </td>
                <td className="text-base font-medium">{pattern.id}</td>
                <td className="text-base font-medium">
                  <PatternCard
                    href={`/account/data/patterns/pattern?id=${pattern.id}`}
                    pattern={pattern}
                    size="xs"
                    Link={Link}
                  />
                </td>
                <td className="text-base font-medium">
                  <Link
                    href={`/account/data/patterns/pattern?id=${pattern.id}`}
                    className="text-secondary underline decoration-2 hover:decoration-4"
                  >
                    {pattern.name}
                  </Link>
                </td>
                <td className="text-base font-medium">
                  <Link
                    href={`/designs/${pattern.design}`}
                    className="text-secondary underline decoration-2 hover:decoration-4"
                  >
                    {capitalize(pattern.design)}
                  </Link>
                </td>
                <td className="text-base font-medium">{shortDate(pattern.createdAt)}</td>
                <td className="text-base font-medium">
                  {pattern.public ? <BoolYesIcon /> : <BoolNoIcon />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  )
}
