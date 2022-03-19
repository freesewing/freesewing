import PageSizeIcon from 'shared/components/icons/page-size'
import { useTranslation } from 'next-i18next'
import Popout from 'shared/components/popout'

const sizes = ['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid']

const PageSizePicker = ({ gist, updateGist }) => {
  const { t } = useTranslation(['workbench'])
  const setSize = size => {
    updateGist(
      ['_state', 'layout', 'forPrinting', 'page', 'size'],
      size
    )
    if (!gist._state?.layout?.forPrinting?.page?.orientation) {
      updateGist(
        ['_state', 'layout', 'forPrinting', 'page', 'orientation'],
        'portrait'
      )
    }
  }

  if (
    !gist._state?.layout?.forPrinting?.page?.size ||
    sizes.indexOf(gist._state.layout.forPrinting.page.size) === -1
  ) return (
    <Popout tip>
      <h3>{t('startBySelectingAThing', { thing: t('pageSize')})}</h3>
      <div className="flex flex-row gap-4">
      {sizes.map(size => (
          <button
            key={size}
            onClick={() => setSize(size)}
            className="btn btn-primary"
          >
            <span className="capitalize">
              {size}
            </span>
          </button>
      ))}
      </div>
    </Popout>
  )

  return (
    <div className={`dropdown`}>
      <div tabIndex="0" className={`
        m-0 btn btn-primary flex flex-row gap-2
        hover:text-primary-content

      `}>
        <PageSizeIcon />
        <span>{t(`pageSize`)}:</span>
        <span className="ml-2 font-bold">{gist._state.layout.forPrinting.page.size}</span>
      </div>
      <ul
        tabIndex="0"
        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
      >
        {sizes.map(size => (
          <li key={size}>
            <button
              onClick={() => setSize(size)}
              className="btn btn-ghost hover:bg-base-200"
            >
              <span className="text-base-content capitalize">
                {size}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PageSizePicker
