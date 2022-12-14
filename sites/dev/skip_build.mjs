// Do not build anything that is not the v2 branch
if (process.env.VERCEL_GIT_COMMIT_REF === 'v2') {
  console.log('✅ - v2 build - Proceed to build')
  process.exit(1)
}

// Do not waste time building this commit
console.log('🛑 - Not production and not v2 - Do not build')
process.exit(0)

