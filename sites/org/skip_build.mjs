import process from 'node:process'

// For now, never build org
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

// Do not build anything that is not the develop branch
if (process.env.VERCEL_GIT_COMMIT_REF === 'develop') {
  console.log('✅ - develop build - Proceed to build')
  process.exit(1)
}

console.log('🛑 - Unhandled case - Do not build')
process.exit(0)
