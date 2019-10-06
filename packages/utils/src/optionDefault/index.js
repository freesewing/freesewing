import optionType from '../optionType'

const optionDefault = (name, option, recipe) => {
  let type = optionType(option)
  // Default from recipe?
  let fromRecipe = false
  if (
    recipe &&
    typeof recipe.settings !== 'undefined' &&
    typeof recipe.settings.options !== 'undefined' &&
    typeof recipe.settings.options[name] !== 'undefined'
  )
    fromRecipe = true

  switch (type) {
    case 'constant':
      return option
      break
    case 'list':
      if (fromRecipe) return recipe.settings.options[name]
      return option.dflt
      break
    default:
      let factor = type === 'pct' ? 100 : 1
      if (fromRecipe) return Math.round(10 * recipe.settings.options[name] * factor) / 10
      else return option[type]
      break
  }
}

export default optionDefault
