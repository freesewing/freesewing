import yaml from 'js-yaml'
import axios from 'axios'

const preload = {
  github: async (id, design) => {
    let result
    try {
      result = await axios.get(`https://api.github.com/gists/${id}`)
    }
    catch (err) {
      console.log(err)
      return [false, 'An unexpected error occured']
    }

    if (result.data.files['pattern.yaml'].content) {
      let g = yaml.load(result.data.files['pattern.yaml'].content)

      if (g.design !== undefined && g.design !== design.config.name) return [
        false, `You tried loading a configuration for ${g.design} into a ${design.config.name} development environment`
      ]

      return g
    }

    // TODO notify people of these errors
    else return [false, 'This gist does not seem to be a valid pattern configuration']
  }
}

export default preload

