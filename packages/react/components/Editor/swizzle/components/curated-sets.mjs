export const CuratedMeasurementsSetLineup = ({ sets = [], locale, clickHandler, Swizzled }) => (
  <div
    className={`w-full flex flex-row ${
      sets.length > 1 ? 'justify-start px-8' : 'justify-center'
    } overflow-x-scroll`}
    style={{
      backgroundImage: `url(/img/lineup-backdrop.svg)`,
      width: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
    }}
  >
    {sets.map((set) => {
      const props = {
        className: 'aspect-[1/3] w-auto h-96',
        style: {
          backgroundImage: `url(${Swizzled.methods.cloudImageUrl({
            id: `cset-${set.id}`,
            type: 'lineup',
          })})`,
          width: 'auto',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        onClick: () => clickHandler(set),
      }

      return (
        <div className="flex flex-col items-center" key={set.id}>
          <button {...props} key={set.id}></button>
          <b>{set[`name${Swizzled.methods.capitalize(locale)}`]}</b>
        </div>
      )
    })}
  </div>
)
