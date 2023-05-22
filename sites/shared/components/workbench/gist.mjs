import yaml from 'js-yaml'
import axios from 'axios'
import { Json } from 'shared/components/json.mjs'
import { Yaml } from 'shared/components/yaml.mjs'

export const GistAsJson = (props) => (
  <div className="max-w-screen-xl m-auto">
    <Json>{JSON.stringify(props.gist, null, 2)}</Json>
  </div>
)

export const GistAsYaml = (props) => (
  <div className="max-w-screen-xl m-auto">
    <Yaml json={JSON.stringify(props.gist, null, 2)} />
  </div>
)

export const defaultGist = {
  sa: 0,
  saBool: false,
  saMm: 10,
  scale: 1,
  complete: true,
  paperless: false,
  units: 'metric',
  locale: 'en',
  margin: 2,
  renderer: 'react',
  embed: true,
}

export const preloadGist = {
  github: async (id, design) => {
    let result
    try {
      result = await axios.get(`https://api.github.com/gists/${id}`)
    } catch (err) {
      console.log(err)
      return [false, 'An unexpected error occured']
    }

    if (result.data.files['pattern.yaml'].content) {
      let g = yaml.load(result.data.files['pattern.yaml'].content)

      if (g.design !== undefined && g.design !== design.designConfig.data.name)
        return [
          false,
          `You tried loading a configuration for ${g.design} into a ${design.designConfig.data.name} development environment`,
        ]

      return g
    }

    // TODO notify people of these errors
    else return [false, 'This gist does not seem to be a valid pattern configuration']
  },
}
