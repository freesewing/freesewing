import Yaml from 'shared/components/yaml.js'

const GistAsYaml = props => (
  <div className="max-w-screen-xl m-auto">
    <Yaml json={JSON.stringify(props.gist, null, 2)} />
  </div>
)

export default GistAsYaml
