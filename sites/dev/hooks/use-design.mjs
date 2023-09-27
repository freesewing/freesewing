import { Legend } from '@freesewing/legend'
import { Plugintest } from '@freesewing/plugintest'
import { Rendertest } from '@freesewing/rendertest'
import { Tutorial } from '@freesewing/tutorial'

const designs = {
  legend: Legend,
  plugintest: Plugintest,
  rendertest: Rendertest,
  tutorial: Tutorial,
}

export const useDesign = (design) => (designs[design] ? designs[design] : false)

export const collection = Object.keys(designs)
