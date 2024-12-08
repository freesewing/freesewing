import mustache from 'mustache'

export const FlagTypeIcon = ({ Swizzled, type, className = 'w-6 h-6' }) => {
  const Icon = Swizzled.components[`Flag${Swizzled.methods.capitalize(type)}Icon`]

  return Icon ? <Icon className={className} /> : null
}

export const Flag = ({ Swizzled, data, handleUpdate }) => {
  const btnIcon = data.suggest?.icon ? (
    <Swizzled.components.FlagTypeIcon type={data.suggest.icon} className="w-5 h-6 sm:w-6 h-6" />
  ) : null
  const { t } = Swizzled.methods

  const button =
    data.suggest?.text && data.suggest?.update ? (
      <button
        className={`btn btn-secondary btn-outline flex flex-row items-center ${
          btnIcon ? 'gap-6' : ''
        }`}
        onClick={() => handleUpdate(data.suggest.update)}
      >
        {btnIcon}
        {t(data.suggest.text)}
      </button>
    ) : null

  const desc = data.replace ? mustache.render(t(data.desc), data.replace) : t(data.desc)
  const notes = data.notes
    ? Array.isArray(data.notes)
      ? '\n\n' +
        data.notes
          .map((note) => (data.replace ? mustache.render(t(note), data.replace) : t(note)))
          .join('\n\n')
      : '\n\n' + (data.replace ? mustache.render(t(data.notes), data.replace) : t(data.notes))
    : null

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="first:mt-0 grow md flag">
        <pre>{desc}</pre>
        <pre>{notes}</pre>
      </div>
      {button ? <div className="mt-2 w-full flex flex-row justify-end">{button}</div> : null}
    </div>
  )
}
//<Mdx md={notes ? desc + notes : desc} />

export const FlagsAccordionTitle = ({ flags, Swizzled }) => {
  const { t } = Swizzled.methods
  const flagList = Swizzled.methods.flattenFlags(flags)

  if (Object.keys(flagList).length < 1) return null

  return (
    <>
      <h5 className="flex flex-row gap-2 items-center justify-between w-full">
        <span className="text-left">
          {t('pe:flagMenu.t')} ({Object.keys(flagList).length})
        </span>
        <Swizzled.components.FlagTypeIcon className="w-8 h-8" />
      </h5>
      <p className="text-left">
        {Object.keys(flagList).length > 1 ? t('pe:flagMenuMany.d') : t('pe:flagMenuOne.d')}
      </p>
    </>
  )
}

export const FlagsAccordionEntries = ({ flags, update, Swizzled }) => {
  const flagList = Swizzled.methods.flattenFlags(flags)
  const { t } = Swizzled.methods

  if (Object.keys(flagList).length < 1) return null

  const handleUpdate = (config) => {
    if (config.settings) update.settings(...config.settings)
    if (config.ui) update.ui(...config.settings)
  }

  return (
    <Swizzled.components.SubAccordion
      items={Object.entries(flagList).map(([key, flag], i) => {
        const title = flag.replace ? mustache.render(t(flag.title), flag.replace) : t(flag.title)

        return [
          <div className="w-full flex flex-row gap2 justify-between" key={i}>
            <div className="flex flex-row items-center gap-2">
              <div className="no-shrink">
                <Swizzled.components.FlagIcon type={flag.type} />
              </div>
              <span className="font-medium text-left">{title}</span>
            </div>
            <span className="uppercase font-bold">{flag.type}</span>
          </div>,
          <Swizzled.components.Flag key={key} t={t} data={flag} handleUpdate={handleUpdate} />,
          key,
        ]
      })}
    />
  )
}
