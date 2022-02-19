import chai from 'chai'
import { spawnSync } from 'child_process'

describe('CLI help', () => {
  it("Should run successfully", () => {
    const result = spawnSync('node', ['./lib/cli.js', '-h'])
    if (result.status != 0) {
      console.log('Command failed: node ./lib/cli.js -h');
      console.log('status: ' + result.status);
      console.log('stdout:')
      console.log(result.stdout.toString('utf8'));
      console.log('stderr:')
      console.log(result.stderr.toString('utf8'));
      chai.assert.fail();
    }
  })
})
