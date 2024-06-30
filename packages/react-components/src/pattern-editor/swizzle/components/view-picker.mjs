import { useState } from 'react'

/**
 * The design view is loaded if and only if not design is passed to the editor
 *
 * @param (object) props - All the props
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} designs - Object holding all designs
 * @param {object} update - ViewWrapper state update object
 */
export const ViewPicker = ({ designs, design, Design, Swizzled, update, state }) => {
  const [showDev, setShowDev] = useState(false)

  return (
    <div className="text-center mt-8 mb-24 px-4">
      <h2>{Swizzled.methods.t('Choose an activity')}</h2>
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 mx-auto justify-center gap-2 lg:gap-4 mt-4">
        {Swizzled.config.mainViews.map((view) => (
          <MainCard key={view} {...{ view, update, Design, Swizzled }} />
        ))}
      </div>
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center gap-2 lg:gap-4 mt-4">
        {Swizzled.config.extraViews.map((view) => (
          <ExtraCard key={view} {...{ view, update, Swizzled }} />
        ))}
      </div>
      {showDev || state.ui.control > 3 ? (
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center gap-2 lg:gap-4 mt-4">
          {Swizzled.config.devViews.map((view) => (
            <ExtraCard key={view} {...{ view, update, Swizzled }} />
          ))}
        </div>
      ) : null}
      {state.ui.control < 4 ? (
        <button className="btn btn-ghost mt-2" onClick={() => setShowDev(!showDev)}>
          {Swizzled.methods.t(`pe:${showDev ? 'hide' : 'show'}AdvancedOptions`)}
        </button>
      ) : null}
    </div>
  )
}

const MainCard = ({ view, Swizzled, update, Design }) => {
  const Icon = Swizzled.components[`View${Swizzled.methods.capitalize(view)}Icon`]
  const { NoIcon } = Swizzled.components
  const color = Swizzled.config.mainViewColors[view] || 'neutral'
  return (
    <button
      className={`border shadow p-4 rounded-lg w-full bg-${
        color === 'none' ? 'secondary' : color
      } ${
        color === 'none' ? 'bg-opacity-10 hover:bg-opacity-20' : 'hover:bg-opacity-90'
      } flex flex-col`}
      title={Swizzled.methods.t(`pe:view.${view}.t`)}
      onClick={() => update.view(view)}
    >
      <h4
        className={`flex flex-row items-center justify-between p-0 text-${color}-content mb-2 text-left`}
      >
        {Swizzled.methods.t(`pe:view.${view}.t`)}
        {Icon ? <Icon className="w-10 h-10" /> : <NoIcon className="w-10 h-10" />}
      </h4>
      <p className={`text-left text-lg m-0 p-0 text-${color}-content grow-2`}>
        {Swizzled.methods.t(`pe:view.${view}.d`, {
          design: `${Design.designConfig.data.name} v${Design.designConfig.data.version}`,
        })}
      </p>
    </button>
  )
}

const ExtraCard = ({ view, Swizzled, update }) => {
  const Icon = Swizzled.components[`View${Swizzled.methods.capitalize(view)}Icon`]
  const { NoIcon } = Swizzled.components
  return (
    <button
      className="border shadow p-3 rounded-lg w-full hover:bg-secondary hover:bg-opacity-20 flex flex-col"
      title={Swizzled.methods.t(`pe:view.${view}.t`)}
      onClick={() => update.view(view)}
    >
      <h5 className="flex flex-row items-center justify-between p-0 mb-1 text-left">
        {Swizzled.methods.t(`pe:view.${view}.t`)}
        {Icon ? <Icon className="w-8 h-8" /> : <NoIcon className="w-8 h-8" />}
      </h5>
      <p className="text-left m-0 p-0 grow-2">{Swizzled.methods.t(`pe:view.${view}.d`)}</p>
    </button>
  )
}
