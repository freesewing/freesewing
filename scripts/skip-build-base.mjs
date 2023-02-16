import process from 'node:process'
import { execSync } from 'child_process'

export const shouldSkipBuild = (siteName, checkFolders = '../shared .') => {
  console.log('Skip build script version 1.0.0')

  // Do not block production builds
  if (process.env.VERCEL_ENV === 'production') {
    console.log('✅ - Production build - Proceed to build')
    process.exit(1)
  }

  // Do not build dependabot PRs
  if (process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN === 'dependabot[bot]') {
    console.log('🛑 - Dependabot PR - Do not build')
    process.exit(0)
  }

  const branch = process.env.VERCEL_GIT_COMMIT_REF
  // Always build develop branch
  if (branch === 'develop') {
    console.log('✅ - develop build - Proceed to build')
    process.exit(1)
  }

  // Only build pull requests that made changes to the given site
  if (process.env.VERCEL_GIT_PULL_REQUEST_ID) {
    try {
      // we need to add the origin so that we can compare to develop
      execSync(
        `git remote add origin https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}.git`
      )
      // we need to fetch develop in order to get the merge base
      execSync(`git fetch origin develop:develop --depth=5`)
      // if depth 5 wasn't enough, keep deepening until we find the merge base
      execSync(
        `until git merge-base develop HEAD > /dev/null; do git fetch origin develop:develop --deepen=1; done`
      )

      // now check for changes
      const changes = execSync(
        `git diff --name-only $(git merge-base develop HEAD) HEAD -- ${checkFolders}`
      ).toString()
      if (changes) {
        console.log(`✅ - ${siteName} Pull Request - Proceed to build`)
        process.exit(1)
      }
    } catch {
      // just don't error out
    }

    console.log(`🛑 - Pull Request made no changes to ${siteName} - Do not build`)
    process.exit(0)
  }

  console.log('🛑 - Unhandled case - Do not build')
  console.log(`  VERCEL_GIT_COMMIT_AUTHOR_LOGIN: ${process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN}`)
  console.log(`  VERCEL_GIT_COMMIT_REF: ${branch}`)
  process.exit(0)
}
