//import path from 'path'
import fs from 'fs'

/*
 * Only this token allows exporting data
 */
const export_token = 'TOKEN_HERE'

/*
 * Helper method to export a given collection
 * from mongo via the v2 backend
 */
const exportCollection = async (name) => {
  const result = await fetch(`https://backend.freesewing.org/admin/export/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ export_token: export_token }),
  })
  const data = await result.json()

  return data
}

/*
 * Load data from v2 backend
 */
const loadV2Data = async () => {
  for (const collection of ['newsletters', 'people', 'patterns', 'users']) {
    console.log(`Exporting: ${collection.toUpperCase()}`)
    const data = await exportCollection(collection)
    console.log(`  - ${data.length} records exported, writing to disk as v2-${collection}.json`)
    fs.writeFileSync(`./v2-${collection}.json`, JSON.stringify(data, null, 2), 'utf-8')
  }
}

await loadV2Data()
