// Dependencies
import orderBy from 'lodash/orderBy.js'
import { capitalize, shortDate } from '@freesewing/utils'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
import { useSelection } from '@freesewing/react/hooks/useSelection'

// Components
import { TableWrapper } from '@freesewing/react/components/Table'
import { PatternCard } from '@freesewing/react/components/Account'
import { Link as WebLink } from '@freesewing/react/components/Link'
import {
  BoolNoIcon,
  BoolYesIcon,
  PlusIcon,
  RightIcon,
  TrashIcon,
} from '@freesewing/react/components/Icon'

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
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-items-center tw-justify-between tw-mb-4">
        <button
          className="tw-daisy-btn tw-daisy-btn-error"
          onClick={removeSelectedPatterns}
          disabled={count < 1}
        >
          <TrashIcon /> {count} {t('patterns')}
        </button>
        <Link
          className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize tw-w-full md:tw-w-auto hover:tw-text-primary-content"
          href="/-/"
        >
          <PlusIcon />
          Create a new pattern
        </Link>
      </div>
      <TableWrapper>
        <table className="tw-table tw-table-auto">
          <thead className="tw-border tw-border-base-300 tw-border-b-2 tw-border-t-0 tw-border-x-0">
            <tr className="">
              <th className="">
                <input
                  type="checkbox"
                  className="tw-daisy-checkbox tw-daisy-checkbox-secondary"
                  onClick={toggleAll}
                  checked={patterns.length === count}
                />
              </th>
              {Object.keys(fields).map((field) => (
                <th key={field}>
                  <button
                    className="tw-daisy-btn tw-daisy-btn-link tw-capitalize tw-px-0 tw-underline hover:tw-decoration-4 tw-decoration-2 tw-text-secondary"
                    onClick={() => (order === field ? setDesc(!desc) : setOrder(field))}
                  >
                    {fields[field]}{' '}
                    <RightIcon
                      stroke={3}
                      className={`tw-w-4 tw-h-4 ${desc ? 'tw--' : 'tw-'}rotate-90 ${order === field ? '' : 'tw-opacity-0'}`}
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderBy(patterns, order, desc ? 'desc' : 'asc').map((pattern, i) => (
              <tr key={i}>
                <td className="tw-text-base tw-font-medium">
                  <input
                    type="checkbox"
                    checked={selection[pattern.id] ? true : false}
                    className="tw-daisy-checkbox tw-daisy-checkbox-secondary"
                    onClick={() => toggle(pattern.id)}
                  />
                </td>
                <td className="tw-text-base tw-font-medium">{pattern.id}</td>
                <td className="tw-text-base tw-font-medium">
                  <PatternCard
                    href={`/account/data/patterns/pattern?id=${pattern.id}`}
                    pattern={pattern}
                    size="xs"
                    Link={Link}
                  />
                </td>
                <td className="tw-text-base tw-font-medium">
                  <Link
                    href={`/account/data/patterns/pattern?id=${pattern.id}`}
                    className="tw-text-secondary tw-underline tw-decoration-2 hover:tw-decoration-4"
                  >
                    {pattern.name}
                  </Link>
                </td>
                <td className="tw-text-base tw-font-medium">
                  <Link
                    href={`/designs/${pattern.design}`}
                    className="tw-text-secondary tw-underline tw-decoration-2 hover:tw-decoration-4"
                  >
                    {capitalize(pattern.design)}
                  </Link>
                </td>
                <td className="tw-text-base tw-font-medium">{shortDate(pattern.createdAt)}</td>
                <td className="tw-text-base tw-font-medium">
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
