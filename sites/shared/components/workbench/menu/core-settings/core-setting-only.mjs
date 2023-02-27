import { ClearIcon } from 'shared/components/icons.mjs'
import orderBy from 'lodash.orderby'
import { useTranslation } from 'next-i18next'

export const CoreSettingOnly = (props) => {
  const { t } = useTranslation(['app', 'parts', 'settings'])
  const list = props.design.patternConfig.draftOrder
  const partNames = list.map((part) => ({ id: part, name: t(`parts:${part}`) }))

  const togglePart = (part) => {
    const parts = props.gist.only || []
    const newParts = new Set(parts)
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)
    if (newParts.size < 1) reset()
    else props.updateGist(['only'], [...newParts])
  }

  const reset = () => {
    props.unsetGist(['only'])
  }

  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-base-content opacity-60 italic">
        {t(`settings:only.d`)}
      </p>
      <div className="flex flex-row">
        <div className="grow">
          {orderBy(partNames, ['name'], ['asc']).map((part) => (
            <button
              key={part.id}
              onClick={() => togglePart(part.id)}
              className={`
                mr-1 mb-1 text-left text-lg w-full hover:text-secondary-focus px-2
                ${
                  props.gist?.only &&
                  props.gist.only.indexOf(part.id) !== -1 &&
                  'font-bold text-secondary-focus'
                }
              `}
            >
              <span
                className={`
                text-3xl mr-2 inline-block p-0 leading-3
                translate-y-3
              `}
              >
                <>&deg;</>
              </span>
              {part.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <button
          title={t('reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={!props.gist.only || props.gist.only.length < 1}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}
