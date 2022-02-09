/*
 * Starts an in-memory database and a server before running tests.
 */

import '../tests/env.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { loadSampleData, runTasks } from '../src/cli/lib';
import { startApp } from '../src/app';
import { spawn } from 'child_process';

(async () => {
  return MongoMemoryServer.create({ instance: { port: 27017 } });
})()
  .then((mongoServer) => {
    mongoose.connect(mongoServer.getUri() + "freesewing", { useNewUrlParser: true });
  })
  .then(() => { runTasks({ reboot: true }) })
  .then(loadSampleData)
  .then(startApp)
  .then(() => {
    // Forward command-line args to test process.
    const args = ['run', 'test', '--'].concat(process.argv.slice(2));
    spawn('npm', args, { stdio: 'inherit' })
      .on('exit', function(code) {
        // Propagate exit code so that test failures are recognized.
        process.exit(code);
      });
  });

