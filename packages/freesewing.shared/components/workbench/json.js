import Json from 'shared/components/json.js'

const GistAsJson = props => (
  <div className="max-w-screen-xl m-auto">
    <Json>{JSON.stringify(props.gist, null, 2)}</Json>
  </div>
)

export default GistAsJson
