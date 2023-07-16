import process from 'node:process'
import { execSync } from 'child_process'

const branchesToNeverBuild = ['i18n']

export const shouldSkipBuild = (siteName, checkFolders = '../shared .') => {
  const branch = process.env.VERCEL_GIT_COMMIT_REF
  const commit = process.env.VERCEL_GIT_COMMIT_SHA
  const author = process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN
  const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE

  // Say hi
  console.log(`FreeSewing skip build check:
  branch: ${branch}
  commit: ${commit}
  author: ${author}
  commit message: ${msg}
`)

  // Do not block production builds
  if (process.env.VERCEL_ENV === 'production') {
    console.log('✅  Building: production build')
    process.exit(1)
  }

  // Do not build dependabot PRs
  if (author.toLowerCase().includes('ependabot')) {
    console.log('🛑  Not building: Dependabot PR')
    process.exit(0)
  }

  // Always build develop branch
  if (branch === 'develop') {
    console.log('✅ - Building: develop branch is always built')
    process.exit(1)
  }

  // Do not build branches that should never be build
  if (branchesToNeverBuild.includes(branch)) {
    console.log('🛑  Not building: Branch is included in branches to never build')
    process.exit(0)
  }

  // Do not build commits that have [vercel skip] in the message
  if (msg.includes('skip-build')) {
    console.log('🛑  Not building: Commit message includes skip-build')
    process.exit(0)
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

      let hasMerge = ''
      for (let a = 0; a < 5; a++) {
        try {
          hasMerge = execSync(`git merge-base develop HEAD`).toString()
          break
        } catch {
          // if depth 5 wasn't enough, keep deepening until we find the merge base
          execSync(`git fetch origin develop:develop --deepen=1`)
        }
      }

      if (!hasMerge.length) {
        console.log(`🛑 - Can't find merge base for pull request - Do not build`)
        process.exit(0)
      }

      // now check for changes
      const changes = execSync(
        `git diff --name-only $(git merge-base develop HEAD) HEAD -- ${checkFolders}`
      ).toString()
      if (changes) {
        console.log(`✅ - ${siteName} Pull Request - Proceed to build`)
        process.exit(1)
      }
    } catch (e) {
      console.log(e)
    }

    console.log(`🛑 - Pull Request made no changes to ${siteName} - Do not build`)
    process.exit(0)
  }

  console.log('🛑 - Unhandled case - Do not build')
  process.exit(0)
}
