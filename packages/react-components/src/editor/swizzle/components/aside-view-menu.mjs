import { useState } from 'react'

export const AsideViewMenuButton = ({
  href,
  label,
  children,
  onClick = false,
  active = false,
  extraClasses = 'lg:hover:bg-secondary lg:hover:text-secondary-content',
  Swizzled,
}) => {
  const className = `w-full flex flex-row items-center px-4 py-2 ${extraClasses} ${
    active
      ? 'font-bold lg:font-normal bg-secondary bg-opacity-10 lg:bg-secondary lg:text-secondary-content lg:bg-opacity-50'
      : 'lg:bg-neutral lg:text-neutral-content'
  }`
  const span = <span className="block grow text-left">{label}</span>

  return onClick ? (
    <button {...{ onClick, className }} title={label}>
      {span}
      {children}
    </button>
  ) : (
    <Swizzled.components.Link {...{ href, className }} title={label}>
      {span}
      {children}
    </Swizzled.components.Link>
  )
}

export const ViewTypeIcon = ({ Swizzled, view, className = 'h-6 w-6 grow-0' }) => {
  const Icon = Swizzled.components[`View${Swizzled.methods.capitalize(view)}Icon`]
  if (!Icon) return <Swizzled.components.OptionsIcon />

  return <Icon className={className} />
}

export const AsideViewMenuSpacer = () => (
  <hr className="my-1 w-full opacity-20 font-bold border-t-2" />
)

export const AsideViewMenuIcons = ({ state, update, setDense, dense, Swizzled }) => {
  const { t } = Swizzled.methods
  const iconSize = 'h-6 w-6 grow-0'

  const output = [
    <Swizzled.components.AsideViewMenuButton
      onClick={() => setDense(!dense)}
      label={
        dense ? (
          ''
        ) : (
          <b>
            <em className="pl-4 opacity-60">Editor Views</em>
          </b>
        )
      }
      extraClasses="hidden lg:flex text-accent bg-neutral hover:bg-accent hover:text-neutral-content"
    >
      {dense ? (
        <Swizzled.components.RightIcon
          className={`${iconSize} group-hover:animate-[bounceright_1s_infinite] animate-[bounceright_1s_5]`}
          stroke={4}
        />
      ) : (
        <Swizzled.components.LeftIcon className={`${iconSize} animate-bounce-right`} stroke={4} />
      )}
    </Swizzled.components.AsideViewMenuButton>,
  ]

  let i = 1
  for (const view of [
    'spacer',
    ...Swizzled.config.mainViews,
    'spacer',
    ...Swizzled.config.extraViews,
    'spacerOver3',
    ...Swizzled.config.devViews,
    'spacer',
    'picker',
  ]) {
    if (view === 'spacer') output.push(<Swizzled.components.AsideViewMenuSpacer key={i} />)
    else if (view === 'spacerOver3')
      output.push(state.ui.ux > 3 ? <Swizzled.components.AsideViewMenuSpacer key={i} /> : null)
    else if (state.ui.ux >= Swizzled.config.uxLevels.views[view])
      output.push(
        <Swizzled.components.AsideViewMenuButton
          key={view}
          onClick={() => update.view(view)}
          label={t(`pe:view.${view}.t`)}
          active={state.view === view}
        >
          <Swizzled.components.ViewTypeIcon view={view} />
        </Swizzled.components.AsideViewMenuButton>
      )
    i++
  }

  return output
}

export const AsideViewMenu = ({ Swizzled, view, update, saveAs = false, state }) => {
  const [dense, setDense] = useState(true)
  return (
    <div
      className={`w-64 min-h-screen pt-4
        bg-neutral
        shrink-0 grow-0 self-stretch
        transition-all
        drop-shadow-xl
        ${dense ? '-ml-52' : 'ml-0'}`}
    >
      <aside className="sticky top-4 group">
        <div className="flex flex-col items-center w-full">
          <Swizzled.components.AsideViewMenuIcons {...{ update, state, setDense, dense }} />
        </div>
      </aside>
    </div>
  )
}
