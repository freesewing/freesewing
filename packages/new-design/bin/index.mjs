#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import prompts from 'prompts'
import chalk from 'chalk'
import { execSync } from 'child_process'

/*
 * We need the __dirname equivalent in ESM
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * This does what needs doing
 */
async function main() {
  // Get project name and other configuration
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your design?',
      initial: 'my-freesewing-design'
    },
    // Add more prompts as needed
  ]);

  const { projectName } = response;
  const projectPath = path.join(process.cwd(), projectName);

  // Create project directory
  console.log(`\nCreating a new FreeSewing design in ${chalk.green(projectPath)}`);
  fs.ensureDirSync(projectName);

  // Copy template files
  const templatePath = path.join(__dirname, '../template');
  fs.copySync(templatePath, projectPath);

  // Customize files based on user input
  const docusaurusConfig = path.join(projectPath, 'docusaurus.config.js');
  let configContent = fs.readFileSync(docusaurusConfig, 'utf8');
  configContent = configContent.replace(/DESIGN_NAME/g, projectName);
  fs.writeFileSync(docusaurusConfig, configContent);

  // Update package.json in the new project
  const pkgJsonPath = path.join(projectPath, 'package.json');
  const pkgJsonContent = fs.readFileSync(pkgJsonPath, 'utf8');
  const pkgJson = JSON.parse(pkgJsonContent);
  pkgJson.name = projectName;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

  // Install dependencies
  console.log('\nInstalling dependencies...');
  try {
    process.chdir(projectPath);
    execSync('npm install', { stdio: 'inherit' });
    console.log(chalk.green('\nSuccess!'));
    console.log(`\nCreated ${projectName} at ${projectPath}`);
    console.log('\nInside that directory, you can run:');
    console.log(`\n  ${chalk.cyan('npm start')}`);
    console.log('    Starts the development server.');
    console.log(`\n  ${chalk.cyan('npm run build')}`);
    console.log('    Bundles your website into static files for production.');
  } catch (err) {
    console.error('\nFailed to install dependencies:', err);
  }
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
