// Dependencies
import { DateTime } from 'luxon'
import orderBy from 'lodash/orderBy.js'
import { capitalize, shortDate } from '@freesewing/utils'
import { apikeyLevels } from '@freesewing/config'
// Context
import { ModalContext } from '@freesewing/react/context/Modal'
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

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
import { Popout } from '@freesewing/react/components/Popout'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { NumberCircle } from '@freesewing/react/components/Number'
import { StringInput, FormControl, ListInput } from '@freesewing/react/components/Input'
import { DisplayRow } from './shared.mjs'
import { CopyToClipboardButton } from '@freesewing/react/components/CopyToClipboardButton'
import { TimeAgo, TimeToGo } from '@freesewing/react/components/Time'
import { KeyVal } from '@freesewing/react/components/KeyVal'

const t = (input) => {
  console.log('t called', input)
  return input
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

  // Context
  const { setModal } = useContext(ModalContext)

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

  return (
    <>
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-items-center tw-justify-between tw-mb-4">
        <button
          className="tw-daisy-btn tw-daisy-btn-error"
          onClick={removeSelectedApikeys}
          disabled={count < 1}
        >
          <TrashIcon /> {count} API Keys
        </button>
        <button
          className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize tw-w-full md:tw-w-auto hover:tw-text-primary-content"
          onClick={() =>
            setModal(
              <ModalWrapper keepOpenOnClick>
                <NewApikey onCreate={() => setRefresh(refresh + 1)} />
              </ModalWrapper>
            )
          }
        >
          <PlusIcon />
          Create a new API key
        </button>
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
                  checked={apikeys.length === count}
                />
              </th>
              {Object.keys(fields).map((field) => (
                <th key={field}>
                  <button
                    className="tw-daisy-btn tw-daisy-btn-link tw-capitalize tw-px-0 underline tw-hover:decoration-4 tw-decoration-2 tw-text-secondary"
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
            {orderBy(apikeys, order, desc ? 'desc' : 'asc').map((apikey, i) => (
              <tr key={i}>
                <td className="tw-text-base tw-font-medium">
                  <input
                    type="checkbox"
                    checked={selection[apikey.id] ? true : false}
                    className="tw-daisy-checkbox tw-daisy-checkbox-secondary"
                    onClick={() => toggle(apikey.id)}
                  />
                </td>
                <td className="tw-text-base tw-font-medium">
                  <Uuid uuid={apikey.id} label="Key" />
                </td>
                {Object.keys(fields)
                  .slice(1, 4)
                  .map((field) => (
                    <td key={field} className="tw-text-base tw-font-medium">
                      <button
                        className="tw-daisy-btn tw-daisy-btn-link tw-text-secondary hover:tw-decoration-4"
                        onClick={() =>
                          setModal(
                            <ModalWrapper>
                              <ApiKey apikey={apikey} />
                            </ModalWrapper>
                          )
                        }
                      >
                        {apikey[field]}
                      </button>
                    </td>
                  ))}
                <td className="tw-text-base tw-font-medium">{shortDate(apikey.createdAt)}</td>
                <td className="tw-text-base tw-font-medium">{shortDate(apikey.expiresAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  )
}

const ApiKey = ({ apikey }) => (
  <>
    <h2 className="tw-flex tw-flex-row tw-items-center tw-gap-2">
      API Key <Uuid uuid={apikey.id} />
    </h2>
    <ul className="tw-list tw-list-disc tw-ml-4">
      {Object.entries(fields).map(([key, label]) => (
        <li key={key}>
          {label}: <b>{apikey[key]}</b>
        </li>
      ))}
    </ul>
  </>
)

const NewApikey = ({ onCreate = false }) => {
  // State
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [expires, setExpires] = useState(Date.now())
  const [apikey, setApikey] = useState(false)

  // Hooks
  const { account } = useAccount()
  const backend = useBackend()

  // Context
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const levels = account.role === 'admin' ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [0, 1, 2, 3, 4]

  const createKey = async () => {
    setLoadingStatus([true, 'Creating new API key'])
    const [status, body] = await backend.createApikey({
      name,
      level,
      expiresIn: Math.floor((expires.valueOf() - Date.now().valueOf()) / 1000),
    })
    if (status === 201 && body.result === 'created') {
      setLoadingStatus([true, 'API key created', true, true])
      setApikey(body.apikey)
      if (typeof onCreate === 'function') onCreate(body.apikey)
    } else setLoadingStatus([true, 'An error occured. Please report this', true, false])
  }

  const clear = () => {
    setApikey(false)
    setGenerate(false)
    setName('')
    setLevel(1)
  }

  return (
    <div className="tw-w-full">
      <h2>New API key {apikey ? `: ${apikey.name}` : ''}</h2>
      {apikey ? (
        <ShowNewApikey {...{ apikey }} />
      ) : (
        <>
          <StringInput
            id="apikey-name"
            label="Key Name"
            current={name}
            update={setName}
            valid={(val) => val.length > 0}
            placeholder={'Alicia Key'}
          />
          <ExpiryPicker {...{ expires, setExpires }} />
          <ListInput
            id="apikey-level"
            label="Key Level"
            list={levels.map((l) => ({
              val: l,
              label: (
                <div className="tw-flex tw-flex-row tw-items-center tw-w-full tw-justify-between">
                  <span>{apikeyLevels[l]}</span>
                  <NumberCircle nr={l} color="secondary" />
                </div>
              ),
            }))}
            current={level}
            update={setLevel}
          />
          <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-w-full tw-my-8">
            <button
              className="tw-daisy-btn tw-daisy-btn-primary tw-capitalize tw-w-full md:tw-w-auto"
              disabled={name.length < 1}
              onClick={createKey}
            >
              New API key
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const ShowNewApikey = ({ apikey }) => (
  <div>
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-items-center tw-mb-2">
      <KeyVal k="name" val={apikey.name} color="secondary" />
      <KeyVal k="level" val={apikey.level} color="secondary" />
      <KeyVal k="created" val={<TimeAgo iso={apikey.createdAt} />} color="secondary" />
      <KeyVal k="expires" val={<TimeToGo iso={apikey.expiresAt} />} color="secondary" />
    </div>
    <h6 className="tw-flex tw-flex-row tw-items-center">
      Key
      <CopyToClipboardButton sup content={apikey.key} label="API key ID" />
    </h6>
    <pre>{apikey.key}</pre>
    <h6 className="tw-flex tw-flex-row tw-items-center">
      Secret
      <CopyToClipboardButton sup content={apikey.secret} label="API key secret" />
    </h6>
    <pre>{apikey.secret}</pre>
    <Popout warning compact>
      This is the only time you can see the key secret, make sure to copy it.
    </Popout>
  </div>
)

const ExpiryPicker = ({ expires, setExpires }) => {
  const [days, setDays] = useState(1)

  // Run update when component mounts
  useEffect(() => update(days), [])

  const update = (evt) => {
    const value = typeof evt === 'number' ? evt : evt.target.value
    setExpires(DateTime.now().plus({ days: value }))
    setDays(value)
  }

  return (
    <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
      <FormControl
        label="Key Expiry"
        labelBL={shortDate(expires)}
        labelBR={<TimeToGo iso={expires} />}
      >
        <input
          type="range"
          min="1"
          max={731}
          value={days}
          className="tw-daisy-range tw-daisy-range-secondary tw-w-full"
          onChange={update}
        />
      </FormControl>
    </div>
  )
}
