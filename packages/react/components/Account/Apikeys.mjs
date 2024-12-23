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

// Components
import { TableWrapper } from '@freesewing/react/components/Table'
import { Link as WebLink } from '@freesewing/react/components/Link'
import {
  BoolNoIcon,
  BoolYesIcon,
  PlusIcon,
  RightIcon,
  TrashIcon,
} from '@freesewing/react/components/Icon'
import { Uuid } from '@freesewing/react/components/Uuid'

const t = (input) => {
  console.log('t called', input)
  return input
}

/*
 * Component for the account/apikeys page
 *
 * @params {object} props - All React props
 * @params {function} Link - A framework specific Link component for client-side routing
 */
export const Apikeys = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // State
  const [apikeys, setApikeys] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [order, setOrder] = useState('id')
  const [desc, setDesc] = useState(false)

  // Hooks
  const backend = useBackend()
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)
  const { count, selection, setSelection, toggle, toggleAll } = useSelection(apikeys)

  // Effects
  useEffect(() => {
    const getApikeys = async () => {
      setLoadingStatus([true, 'Loading API keys from backend'])
      const [status, body] = await backend.getApikeys()
      if (status === 200) {
        setApikeys(body.apikeys)
        setLoadingStatus([true, 'API keys loaded', true, true])
      } else setLoadingStatus([false, 'Failed to load API keys from backend', true, true])
    }
    getApikeys()
  }, [refresh])

  // Helper to delete one or more patterns
  const removeSelectedApikeys = async () => {
    let i = 0
    for (const key in selection) {
      i++
      await backend.removeApikey(key)
      setLoadingStatus([
        true,
        <LoadingProgress val={i} max={count} msg="Removing API keys" key="linter" />,
      ])
    }
    setSelection({})
    setRefresh(refresh + 1)
    setLoadingStatus([true, 'Nailed it', true, true])
  }

  const fields = {
    id: 'Key',
    name: 'Name',
    calls: 'Calls',
    level: 'Level',
    level: 'Level',
    createdAt: 'Created',
    expiresAt: 'Expires',
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-between mb-4">
        <button
          className="daisy-btn daisy-btn-error"
          onClick={removeSelectedApikeys}
          disabled={count < 1}
        >
          <TrashIcon /> {count} API Keys
        </button>
        <Link
          className="daisy-btn daisy-btn-primary capitalize w-full md:w-auto hover:text-primary-content"
          href="/-/"
        >
          <PlusIcon />
          Create a new API key
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
                  checked={apikeys.length === count}
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
            {orderBy(apikeys, order, desc ? 'desc' : 'asc').map((apikey, i) => (
              <tr key={i}>
                <td className="text-base font-medium">
                  <input
                    type="checkbox"
                    checked={selection[apikey.id] ? true : false}
                    className="daisy-checkbox daisy-checkbox-secondary"
                    onClick={() => toggle(apikey.id)}
                  />
                </td>
                <td className="text-base font-medium">
                  <Uuid uuid={apikey.id} label="Key" />
                </td>
                {Object.keys(fields)
                  .slice(1, 3)
                  .map((field) => (
                    <td key={field} className="text-base font-medium">
                      {apikey[field]}
                    </td>
                  ))}
                <td className="text-base font-medium">{shortDate(apikey.createdAt)}</td>
                <td className="text-base font-medium">{shortDate(apikey.expiresAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  )
}
