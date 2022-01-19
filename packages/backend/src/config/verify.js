const verifyConfig = (config, chalk) => {
  const nonEmptyString = (input) => {
    if (typeof input === 'string' && input.length > 0) return true
    return false
  }
  const warnings = []
  const errors = []

  // Required (error when missing)
  //
  // Database
  if (!nonEmptyString(config.db.uri)) errors.push({ e: 'FS_MONGO_URI', i: 'mongo' })

  // Encryption
  if (!nonEmptyString(config.encryption.key)) errors.push({ e: 'FS_ENC_KEY', i: 'encryption' })

  // Wanted (warning when missing)
  //
  // API
  if (!nonEmptyString(config.api)) warnings.push({ e: 'FS_BACKEND', i: 'api' })

  // Site
  if (!nonEmptyString(config.api)) warnings.push({ e: 'FS_SITE', i: 'site' })

  // SMTP
  if (!nonEmptyString(config.smtp.host)) warnings.push({ e: 'FS_SMTP_HOST', i: 'smtp' })

  if (!nonEmptyString(config.smtp.user)) warnings.push({ e: 'FS_SMTP_USER', i: 'smtp' })

  if (!nonEmptyString(config.smtp.pass)) warnings.push({ e: 'FS_SMTP_PASS', i: 'smtp' })

  // OAUTH
  if (!nonEmptyString(config.oauth.github.clientId))
    warnings.push({ e: 'FS_GITHUB_CLIENT_ID', i: 'oauth' })

  if (!nonEmptyString(config.oauth.github.clientSecret))
    warnings.push({ e: 'FS_GITHUB_CLIENT_SECRET', i: 'oauth' })

  if (!nonEmptyString(config.oauth.google.clientId))
    warnings.push({ e: 'FS_GOOGLE_CLIENT_ID', i: 'oauth' })

  if (!nonEmptyString(config.oauth.google.clientSecret))
    warnings.push({ e: 'FS_GOOGLE_CLIENT_SECRET', i: 'oauth' })

  for (let { e, i } of warnings) {
    console.log(
      chalk.yellow('Warning:'),
      'Missing',
      chalk.yellow(e),
      "environment variable. Some features won't be available.",
      '\n',
      chalk.yellow('See: '),
      chalk.yellow.bold('https://dev.freesewing.org/backend/configuration#' + i),
      '\n'
    )
  }

  for (let { e, i } of errors) {
    console.log(
      chalk.redBright('Error:'),
      'Required environment variable',
      chalk.redBright(e),
      "is missing. The backend won't start without it.",
      '\n',
      chalk.yellow('See: '),
      chalk.yellow.bold('https://dev.freesewing.org/backend/configuration#' + i),
      '\n'
    )
  }

  if (errors.length > 0) {
    console.log(chalk.redBright('Invalid configuration. Stopping here...'))
    return process.exit(1)
  }

  return true
}

export default verifyConfig
