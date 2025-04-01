import { getInput, designFromTemplate, bundleCustomDesigns } from './lib.mjs'

const input = await getInput()
await designFromTemplate(input)
bundleCustomDesigns()
