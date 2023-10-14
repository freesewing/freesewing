/*
 * Exporting this closure that makes sure we have access to the
 * instantiated config
 */
export const rbac = ({ levels }) => {
  const rbacMethods = {}
  for (const [name, level] of Object.entries(levels)) {
    rbacMethods[name] = (user) => user.level >= level
  }

  return {
    rbac: rbacMethods,
  }
}
