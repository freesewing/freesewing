// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

// Hooks
import React, { useState, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'
import { SaveIcon } from '@freesewing/react/components/Icon'
import { FileInput } from '@freesewing/react/components/Input'
import { Popout } from '@freesewing/react/components/Popout'
import { Yaml } from '@freesewing/react/components/Yaml'

/*
 * Component for the account/bio page
 *
 * @params {object} props - All React props
 * @params {bool} props.welcome - Set to true to use this component on the welcome page
 * @params {function} props.Link - A framework specific Link component for client-side routing
 */
export const ImportSet = () => {
  // Hooks
  const backend = useBackend()
  const { account } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Helper method to upload/save a set
  const uploadSet = async (upload) => {
    setLoadingStatus([true, 'Uploading data'])
    let data
    try {
      const chunks = upload.split(',')
      if (chunks[0].includes('json')) data = JSON.parse(atob(chunks[1]))
      else data = yaml.parse(atob(chunks[1]))
      if (!Array.isArray(data)) data = [data]
      /*
       * Treat each set
       */
      for (const set of data) {
        if (set.measurements || set.measies) {
          const name = set.name || 'J. Doe'
          setLoadingStatus([true, `Importing ${name}`])
          const [status, body] = await backend.createSet({
            name: set.name || 'J. Doe',
            units: set.units || 'metric',
            notes: set.notes || '',
            measies: set.measurements || set.measies,
            userId: account.id,
          })
          if (status === 200) setLoadingStatus([true, `Imported ${name}`, true, true])
          else setLoadingStatus([true, `Import of ${name} failed`, true, false])
        } else {
          setLoadingStatus([true, `Invalid format`, true, false])
        }
      }
    } catch (err) {
      console.log(err)
      setLoadingStatus([true, `Import of ${name || 'file'} failed`, true, false])
    }
  }

  return (
    <div className="tw-w-full">
      <FileInput
        label="Measurements file (YAML / JSON)"
        update={uploadSet}
        current=""
        id="file"
        dropzoneConfig={{
          accept: {
            'application/json': ['.json'],
            'application/yaml': ['.yaml', '.yml'],
          },
          maxFiles: 1,
          multiple: false,
        }}
      />
      <Popout tip>
        <p>
          To import a measurement set, you should have a JSON or YAML file that has the following
          structure:
        </p>
        <Yaml
          js={{
            name: 'Joost',
            units: 'metric',
            notes: 'These are my notes',
            measurements: { biceps: 335, wrist: 190 },
          }}
          title="measurements.yaml"
        />
        <p>
          Your file can either contain a single measurements set, or an array/list of multiple
          measurements sets.
        </p>
      </Popout>
    </div>
  )
}
