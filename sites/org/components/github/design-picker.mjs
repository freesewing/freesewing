import { collection } from 'shared/hooks/use-design.mjs'

export const DesignPicker = ({ designs = [], setDesigns }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-1 flex-wrap mb-4">
        {designs.length > 0 && (
          <>
            <b>Featured:</b>
            {designs.map((d) => (
              <button
                key={d}
                className="btn btn-sm btn-success hover:btn-error capitalize"
                onClick={() => setDesigns(designs.filter((des) => d !== des))}
              >
                {d}
              </button>
            ))}
            <button
              className="btn btn-sm btn-warning hover:btn-error capitalize"
              onClick={() => setDesigns([])}
            >
              Clear All
            </button>
          </>
        )}
      </div>
      <div className="flex flex-row items-center gap-1 flex-wrap">
        <b>Not featured:</b>
        {collection
          .filter((d) => designs.includes(d) === false)
          .map((d) => (
            <button
              key={d}
              className="btn btn-sm btn-neutral btn-outline hover:btn-success capitalize"
              onClick={() => setDesigns([...designs, d])}
            >
              {d}
            </button>
          ))}
      </div>
    </>
  )
}
