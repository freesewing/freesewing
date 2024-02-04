export function InfoController() {}

/*
 * Get the user count
 */
InfoController.prototype.getUserCount = async (req, res, tools) => {
  let result = { errors: ['Failed to run query'] }

  try {
    result = await tools.prisma.user.count()
  } catch (err) {
    console.log(err)
  }

  return result?.errors ? res.status(500).send(result) : res.send({ users: result })
}

/*
 * Get the stats count
 */
InfoController.prototype.getStats = async (req, res, tools) => {
  const stats = { activity: {} }

  /*
   * Any error and we bail
   */
  let error = false

  /*
   * Get simple counts
   */
  let result
  for (const model of [
    'user',
    'pattern',
    'bookmark',
    'set',
    'curatedSet',
    'apikey',
    'subscriber',
  ]) {
    try {
      result = await tools.prisma[model].count()
      stats[model] = result
    } catch (err) {
      console.log(err)
      error = err
    }
  }

  /*
   * Update subscriber count with subscribed users
   */
  let users
  try {
    users = await tools.prisma.user.count({ where: { newsletter: true } })
    stats.subscriber += users
  } catch (err) {
    console.log(err)
    error = err
  }

  /*
   * Count designs
   */
  let designs
  try {
    designs = await tools.prisma.pattern.groupBy({
      by: ['design'],
      _count: {
        design: true,
      },
      orderBy: {
        _count: { design: 'desc' },
      },
    })
    stats.designs = {}
    for (const d of designs) stats.designs[d.design] = d._count.design
  } catch (err) {
    console.log(err)
    error = err
  }

  /*
   * Count connections via jwt
   */
  let jwt
  try {
    jwt = await tools.prisma.user.aggregate({
      _sum: { jwtCalls: true },
      orderBy: { jwtCalls: 'desc' },
    })
    stats.activity.jwt = jwt._sum.jwtCalls
  } catch (err) {
    console.log(err)
    error = err
  }

  /*
   * Count connections via key
   */
  let key
  try {
    key = await tools.prisma.user.aggregate({
      _sum: { keyCalls: true },
      orderBy: { keyCalls: 'desc' },
    })
    stats.activity.key = key._sum.keyCalls
  } catch (err) {
    console.log(err)
    error = err
  }

  /*
   * Find most active users
   */
  /*
   * Count designs
   */
  let top
  try {
    top = await tools.prisma.user.findMany({
      orderBy: { jwtCalls: 'desc' },
      take: 10,
    })
    stats.topUsers = top.map((u) => ({ id: u.id, username: u.username }))
  } catch (err) {
    console.log(err)
    error = err
  }

  return error ? res.status(500).send({ errors: ['Failed to run query'] }) : res.send(stats)
}
