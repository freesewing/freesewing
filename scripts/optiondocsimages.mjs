/*
 * This will create (SVG) images for all options of all patterns
 * To do that, it will load the configuration from:
 *
 * config/pattern-options.js
 *
 * Based on that, it will generate SVG images for each option and store them
 * in the relevant folder:
 *
 * markdown/org/docs/patterns/[pattern]/[option]/[pattern]_[option]_sample.svg
 *
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { designs } from '../config/software/index.mjs'
import { cisFemaleAdult32 } from '../packages/models/dist/index.mjs'
import { plugin as noVersions } from '../plugins/plugin-versionfree-svg/dist/index.mjs'
import { capitalize } from '../packages/core/src/utils.mjs'
import { plugin as theme } from '../plugins/plugin-theme/dist/index.mjs'

// when dependabot updates a dependency in a package.json, we want to update it in our dependencies.yaml
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const image = (pattern, option) => `

## Effect of this option on the pattern
![This image shows the effect of this option by superimposing several variants that have a different value for this option](${pattern}_${option.toLowerCase()}_sample.svg "Effect of this option on the pattern")
`

const insertImage = (file, pattern, option) => {
  const md = fs.readFileSync(file, 'utf-8')
  if (md.indexOf('image shows the effect of this option') === -1)
    fs.writeFileSync(file, md + image(pattern, option))
}

const createImages = async () => {
  for (const pattern in designs) {
    const Pattern = (await import(`../designs/${pattern}/dist/index.mjs`))[capitalize(pattern)]
    for (const option in Pattern.patternConfig.options) {
      const p = new Pattern({
        measurements: cisFemaleAdult32,
        settings: {
          idPrefix: `${pattern}_${option}`,
          embed: true,
        },
      })
        .use(theme)
        .use(noVersions)
        .__init()

      const file = path.join(
        'markdown',
        'org',
        'docs',
        'patterns',
        pattern,
        'options',
        option.toLowerCase(),
        `${pattern}_${option.toLowerCase()}_sample.svg`
      )
      try {
        const svg = p.sampleOption(option).render()
        fs.writeFileSync(path.join(__dirname, '..', file), svg)
        insertImage(
          path.join(
            'markdown',
            'org',
            'docs',
            'patterns',
            pattern,
            'options',
            option.toLowerCase(),
            'en.md'
          ),
          pattern,
          option
        )
        console.log('✅ ' + file)
      } catch (err) {
        console.log('⚠️  ' + file)
        console.log(err)
      }
    }
  }
}

createImages()
