import { useState } from 'react'
//  __SDEFILE__ - This file is a dependency for the stand-alone environment
//import { controlLevels } from 'shared/config/freesewing.config.mjs'
//// Hooks
//import { useTranslation } from 'next-i18next'
//// Components
//import {
//  BeakerIcon,
//  CodeIcon,
//  CutIcon,
//  OptionsIcon,
//  PrintIcon,
//  SaveIcon,
//  SaveAsIcon,
//  RightIcon,
//  LeftIcon,
//  DocsIcon,
//  MeasieIcon,
//  XrayIcon,
//  EditIcon,
//  ExportIcon,
//  GaugeIcon,
//} from 'shared/components/icons.mjs'
//import Link from 'next/link'
//import { MenuWrapper } from 'shared/components/workbench/menus/shared/menu-wrapper.mjs'
//
//export const ns = ['workbench', 'sections']
//
//const icons = {
//  test: BeakerIcon,
//  time: GaugeIcon,
//  export: ExportIcon,
//  Edit: EditIcon,
//  cut: CutIcon,
//  draft: OptionsIcon,
//  print: PrintIcon,
//  save: SaveIcon,
//  saveas: SaveAsIcon,
//  logs: CodeIcon,
//  inspect: XrayIcon,
//  measies: MeasieIcon,
//}

export const ViewMenuButton = ({
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
  const Icon = Swizzled.components[`View${capitalize(view)}Icon`]
  console.log({ Icon })
  if (!Icon) return <Swizzled.components.OptionsIcon />

  return <Icon className={className} />
}

export const ViewMenuIcons = ({ state, update, setDense, dense, Swizzled }) => {
  const { t } = Swizzled.methods
  const iconSize = 'h-6 w-6 grow-0'

  const output = [
    <Swizzled.components.ViewMenuButton
      onClick={() => setDense(!dense)}
      label=""
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
    </Swizzled.components.ViewMenuButton>,
  ]

  for (const view of Swizzled.config.views) {
    if (state.control >= Swizzled.config.controlLevels.views[view])
      output.push(
        <Swizzled.components.ViewMenuButton
          key={view}
          onClick={() => update.view(view)}
          label={t(`pe:views.${view}.t`)}
          active={state.view === view}
        >
          <Swizzled.components.ViewTypeIcon view={view} />
        </Swizzled.components.ViewMenuButton>
      )
  }

  return output
}

export const ViewMenu = ({ Swizzled, view, update, saveAs = false, state }) => {
  console.log('in view meny', state)
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
          <Swizzled.components.ViewMenuIcons {...{ update, state, setDense, dense }} />
        </div>
      </aside>
    </div>
  )
}
