import { Legend } from '@freesewing/legend'
import { Plugintest } from '@freesewing/plugintest'
import { Rendertest } from '@freesewing/rendertest'

const designs = {
  legend: Legend,
  plugintest: Plugintest,
  rendertest: Rendertest,
}

export const useDesign = (design) => (designs[design] ? designs[design] : false)

export const collection = Object.keys(designs)
