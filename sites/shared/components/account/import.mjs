// Dependencies
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { FileInput } from 'shared/components/inputs.mjs'
import { Yaml } from 'shared/components/yaml.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { linkClasses } from 'shared/components/link.mjs'
import yaml from 'yaml'

export const ns = ['account', 'status']

export const Importer = () => {
  // Hooks
  const { account } = useAccount()
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  // Helper method to upload/save a set
  const uploadSet = async (upload) => {
    setLoadingStatus([true, 'processingUpdate'])
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
          const result = await backend.createSet({
            name: set.name || 'J. Doe',
            units: set.units || 'metric',
            notes: set.notes || '',
            measies: set.measurements || set.measies,
            userId: account.id,
          })
          if (result.success) setLoadingStatus([true, `Imported ${name}`, true, true])
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
    <div className="max-w-xl xl:pl-4">
      <p>{t('account:importHere')}</p>
      <p>{t('account:importSupported')}</p>
      <ul className="list list-inside list-disc ml-4">
        <li>
          <a href="#set" className={linkClasses}>
            {t('account:sets')}
          </a>
        </li>
      </ul>
      <h2 id="set">{t('account:importSets')}</h2>
      <FileInput
        label={`${t('account:measieFile')} (YAML / JSON)`}
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
        <p>{t('account:importSetTip1')}</p>
        <Yaml
          js={{
            name: 'Joost',
            units: 'metric',
            notes: '',
            measurements: { biceps: 335, wrist: 190 },
          }}
          title="measurements.yaml"
        />
        <p>{t('account:importSetTip2')}</p>
      </Popout>
    </div>
  )
}
