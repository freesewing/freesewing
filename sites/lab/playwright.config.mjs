import { createConfig } from '../shared/config/playwright.mjs'

const config = createConfig({
  command: 'yarn start',
  url: 'http://127.0.0.1:8000',
  reuseExistingServer: !process.env.CI,
})

export default config
