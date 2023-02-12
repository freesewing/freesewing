import { PageIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const PageOrientationPicker = ({ gist, updateGist }) => {
  const { t } = useTranslation(['workbench'])

  return (
    <button
      className={`
        btn btn-primary flex flex-row gap-2 items-center
        hover:text-primary-content
      `}
      onClick={() =>
        updateGist(
          ['_state', 'layout', 'forPrinting', 'page', 'orientation'],
          gist._state?.layout?.forPrinting?.page?.orientation === 'portrait'
            ? 'landscape'
            : 'portrait'
        )
      }
    >
      <span
        className={
          gist._state?.layout?.forPrinting?.page?.orientation === 'landscape' ? 'rotate-90' : ''
        }
      >
        <PageIcon />
      </span>
      <span>{t(`pageOrientation`)}</span>
    </button>
  )
}
