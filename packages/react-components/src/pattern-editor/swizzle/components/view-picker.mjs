import { useState } from 'react'

/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param {object} designs - Object holding all designs
 * @param {object} methods - Object holding methods that can be swizzled
 * @param {function} methods.t - Translation method
 * @param {object} components - Object holding (swizzled) components
 * @param {object} update - ViewWrapper state update object
 * @param {function} update.design - Setter from the ViewWrapper React state to set the design
 * @return {function} DesignsView - React component
 */
export const ViewPicker = ({ designs = {}, methods, components, update, config, control }) => {
  const [showDev, setShowDev] = useState(false)

  return (
    <div className="text-center mt-8 mb-24">
      <h2>{methods.t('Choose an activity')}</h2>
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 mx-auto justify-center gap-2 lg:gap-4 mt-4">
        {config.mainViews.map((view) => (
          <MainCard key={view} {...{ view, components, update, methods }} />
        ))}
      </div>
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center gap-2 lg:gap-4 mt-4">
        {config.extraViews.map((view) => (
          <ExtraCard key={view} {...{ view, components, update, methods }} />
        ))}
      </div>
      {showDev || control > 3 ? (
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center gap-2 lg:gap-4 mt-4">
          {config.devViews.map((view) => (
            <DevCard key={view} {...{ view, components, update, methods }} />
          ))}
        </div>
      ) : null}
      {control < 4 ? (
        <button className="btn btn-ghost mt-2" onClick={() => setShowDev(!showDev)}>
          {methods.t(`pe:${showDev ? 'hide' : 'show'}AdvancedOptions`)}
        </button>
      ) : null}
    </div>
  )
}

const MainCard = ({ view, components, methods }) => {
  const Icon = components[`View${methods.capitalize(view)}Icon`]
  const { NoIcon } = components
  return (
    <button
      className="border shadow p-4 rounded-lg w-full bg-primary hover:bg-opacity-90 flex flex-col"
      title={methods.t(`pe:view.${view}.t`)}
    >
      <h4 className="flex flex-row items-center justify-between p-0 text-primary-content mb-2 text-left">
        {methods.t(`pe:view.${view}.t`)}
        {Icon ? <Icon className="w-10 h-10" /> : <NoIcon className="w-10 h-10" />}
      </h4>
      <p className="text-left text-lg m-0 p-0 text-primary-content grow-2">
        {methods.t(`pe:view.${view}.d`)}
      </p>
    </button>
  )
}

const ExtraCard = ({ view, components, methods }) => {
  const Icon = components[`View${methods.capitalize(view)}Icon`]
  const { NoIcon } = components
  return (
    <button
      className="max-w-72 border shadow p-3 rounded-lg w-full bg-secondary bg-opacity-5 hover:bg-secondary hover:bg-opacity-20 flex flex-col"
      title={methods.t(`pe:view.${view}.t`)}
    >
      <h5 className="flex flex-row items-center justify-between p-0 mb-1 text-left">
        {methods.t(`pe:view.${view}.t`)}
        {Icon ? <Icon className="w-8 h-8" /> : <NoIcon className="w-8 h-8" />}
      </h5>
      <p className="text-left m-0 p-0 grow-2">{methods.t(`pe:view.${view}.d`)}</p>
    </button>
  )
}

const DevCard = ({ view, components, methods }) => {
  const Icon = components[`View${methods.capitalize(view)}Icon`]
  const { NoIcon } = components
  return (
    <button
      className="max-w-72 border shadow p-3 rounded-lg w-full bg-neutral bg-opacity-5 hover:bg-opacity-20 flex flex-col"
      title={methods.t(`pe:view.${view}.t`)}
    >
      <h5 className="flex flex-row items-center justify-between p-0 mb-1 text-left">
        {methods.t(`pe:view.${view}.t`)}
        {Icon ? <Icon className="w-8 h-8" /> : <NoIcon className="w-8 h-8" />}
      </h5>
      <p className="text-left m-0 p-0 grow-2">{methods.t(`pe:view.${view}.d`)}</p>
    </button>
  )
}
