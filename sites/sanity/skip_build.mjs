import process from 'node:process'
import { execSync } from 'child_process'

// For now, never build CMS
process.exit(0)

// Do not block production builds
if (process.env.VERCEL_ENV === 'production') {
  console.log('✅ - Production build - Proceed to build')
  process.exit(1)
}

// Do not build dependabot PRs
if (process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN === 'dependabot[bot]') {
  console.log('🛑 - Dependebot PR - Do not build')
  process.exit(0)
}

const branch = process.env.VERCEL_GIT_COMMIT_REF
// Always build develop branch
if (branch === 'develop') {
  console.log('✅ - develop build - Proceed to build')
  process.exit(1)
}

// Only build pull requests that made changes to sanity
if (process.env.VERCEL_GIT_PULL_REQUEST_ID) {
  try {
    // we need to fetch develop in order to get the merge base
    execSync(`git fetch origin develop:develop --depth=1`)
    // now check for changes
    const changes = execSync(
      `git diff --name-only $(git merge-base develop HEAD) HEAD -- .`
    ).toString()
    if (changes) {
      console.log('✅ - Sanity Pull Request - Proceed to build')
      process.exit(1)
    }
  } catch {
    // just don't error out
  }

  console.log('🛑 - Pull Request made no changes to Sanity - Do not build')
  process.exit(0)
}

console.log('🛑 - Unhandled case - Do not build')
console.log(`  VERCEL_GIT_COMMIT_AUTHOR_LOGIN: ${process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN}`)
console.log(`  VERCEL_GIT_COMMIT_REF: ${branch}`)
process.exit(0)
