export const config = {
  // Whether we're publishing next or latest tags
  tag: 'next',
  // Minimum node version
  node: 20,
  // Repository to download from
  repo: process.env.FS_REPO || 'freesewing/freesewing',
  // Branch to download from
  branch: process.env.FS_BRANCH || `develop`,
}
