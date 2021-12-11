import themes from 'shared/themes/index.js'

const ThemePicker = ({ app }) => {
  return (
    <select className="select select-bordered w-full max-w-xs" onChange={evt => app.setTheme(evt.target.value)}>
      {Object.keys(themes).map(theme => (
        <option>{theme}</option>
      ))}
    </select>
  )
}

export default ThemePicker
