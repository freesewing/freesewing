const patterns = require('@freesewing/pattern-info').list
const path = require('path')
const spawn = require('child_process').spawn

const dir = path.join(__dirname, '..')
const base = 'aaron'

const buildPatternWorkbenches = async (patterns) => {
  for (let pattern of patterns) {
    let cwd = path.join(dir, 'packages', pattern, 'example')
    await runScript(cwd, 'rm -rf node_modules yarn.lock')
    await runScript(cwd, 'yarn install')
    await runScript(cwd, 'yarn build')
    await runScript(cwd, 'netlify deploy --prod')
  }
}

const runScript = (cwd, command) =>
  new Promise((resolve, reject) => {
    const script = spawn(command, [], { cwd, shell: true })
    script.stdout.on('data', (data) => process.stdout.write(data))
    script.on('error', (data) => reject(`Error running ${command} in ${dir}: ${data}`))
    script.on('exit', () => resolve())
  }).catch((err) => console.log(err))

buildPatternWorkbenches(patterns)
