import algoliasearch from 'algoliasearch'

export const algoliaClient = () => {
  let indexed = 0
  let client
  let index
  let name
  async function init(config) {
    indexed = 0
    const { appId, apiKey, indexName } = config
    name = indexName
    client = algoliasearch(appId, apiKey)
    index = client.initIndex(indexName)
    const set = await algoliaOp(index.getSettings())
    await algoliaOp(
      index.clearObjects(),
      'Failed to initialize Algolia index. Deleting current records failed'
    )
  }

  async function configureIndex(settings) {
    await algoliaOp(index.setSettings(settings), 'Failed to configure Algolia index')
  }

  async function clearRecords() {
    await algoliaOp(index.clearObjects(), 'Failed to clear records from index')
  }

  async function appendRecords(records) {
    await algoliaOp(index.saveObjects(records), 'Failed to insert records into Algolia')
  }

  async function indexRecords(records) {
    if (records.length === 0) return
    await appendRecords(records)
    indexed += records.length
  }

  async function algoliaOp(promise, errorMessage) {
    try {
      return await promise
    } catch (e) {
      if (e.name === 'ApiError') console.log(errorMessage, new Error(e.message))
      else console.log(errorMessage, JSON.stringify(e))
    }
  }

  return {
    init,
    configureIndex,
    clearRecords,
    appendRecords,
    indexRecords,
  }
}

export const indexSettings = {
  design: (language) => ({
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    hitsPerPage: 20,
    maxValuesPerFacet: 100,
    version: 2,
    searchableAttributes: ['name', 'title', 'unordered(description)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    unretrievableAttributes: null,
    optionalWords: null,
    queryLanguages: [language],
    attributesForFaceting: null,
    attributesToSnippet: null,
    attributesToHighlight: null,
    paginationLimitedTo: 1000,
    attributeForDistinct: null,
    exactOnSingleWordQuery: 'attribute',
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: null,
    separatorsToIndex: '',
    removeWordsIfNoResults: 'none',
    queryType: 'prefixLast',
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym'],
    indexLanguages: [language],
  }),
  docs: (language) => ({
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    hitsPerPage: 20,
    maxValuesPerFacet: 100,
    version: 2,
    searchableAttributes: ['title', 'page', 'unordered(body)'],
    numericAttributesToIndex: null,
    attributesToRetrieve: null,
    unretrievableAttributes: null,
    optionalWords: null,
    queryLanguages: [language],
    attributesForFaceting: null,
    attributesToSnippet: ['body:10'],
    attributesToHighlight: null,
    paginationLimitedTo: 1000,
    attributeForDistinct: null,
    exactOnSingleWordQuery: 'attribute',
    ranking: [
      'asc(type)',
      'asc(title)',
      'typo',
      'geo',
      'words',
      'filters',
      'proximity',
      'attribute',
      'exact',
      'custom',
    ],
    customRanking: null,
    separatorsToIndex: '',
    removeWordsIfNoResults: 'none',
    queryType: 'prefixLast',
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym'],
    indexLanguages: [language],
  }),
}
