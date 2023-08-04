import { round } from 'shared/utils.mjs'

export const KeyValTable = ({ rows }) => (
  <table className="border-collapse h-fit mb-2">
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          <td className="font-bold p-0 text-right ">{row[0]}:</td>
          <td className="px-1">{row[1]}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export const pointCoords = (point) =>
  point ? `[${round(point.x, 1)}, ${round(point.y, 1)}]` : null

export const Attributes = ({ list }) =>
  list ? (
    <ul>
      {Object.keys(list).map((key) => (
        <li key={key}>
          <strong>{key}</strong>: {list[key]}
        </li>
      ))}
    </ul>
  ) : null
