import { cloudflare } from '@freesewing/config'

/*
 * This holds the ID of an example image for all designs in the FreeSewing collection
 */
export const designExampleIds = {
  aaron: 'showcase-tight-aaron',
  albert: 'showcase-albert-by-wouter',
  bee: 'd0312c99-7b2f-4e37-c131-d626d34cd300',
  bella: 'showcase-bella-by-karen',
  benjamin: 'showcase-benjamin-by-anto',
  bent: 'showcase-linnen-jaeger-by-paul',
  bob: 'showcase-bob-bibs-by-duck',
  breanna: 'showcase-magicantace-breanna-sandy',
  brian: 'showcase-brian-by-stefan-1',
  bruce: 'showcase-nsfw-bruce',
  cathrin: 'showcase-green-cathrin',
  carlton: 'showcase-carlton-by-boris',
  carlita: 'showcase-quentin-carlita',
  charlie: 'showcase-charlie-by-joost',
  cornelius: 'showcase-cornelius-by-wouter',
  diana: 'showcase-diana-by-deby',
  florence: 'showcase-rowans-leaf-print-florence',
  florent: 'showcase-florent-by-enno',
  gozer: '80f22d09-e1fd-4e04-67f7-e58253c66200',
  hi: 'showcase-hi-the-shark-has-our-hearts',
  holmes: 'showcase-a-modified-holmes',
  hortensia: 'showcase-hortensia-by-saber',
  huey: 'showcase-anneke-huey',
  hugo: 'showcase-husband-hugo',
  jaeger: 'showcase-jaeger-by-roberta',
  lucy: 'showcase-houseoflief-lucy',
  lumira: 'showcase-lumira-leggings-with-cycling-chamois',
  lunetius: 'showcase-lunetius-the-lacerna',
  noble: 'showcase-a-casual-test-of-noble',
  octoplushy: 'showcase-meet-octoplushy',
  onyx: 'showcase-onyx-full-body-unisuit',
  opal: 'showcase-embroidered-opal-shortalls',
  otis: 'showcase-four-versions-of-otis-and-a-bonus-bob',
  paco: 'showcase-paco-by-karen',
  penelope: 'showcase-pregnant-lady-penelope',
  sandy: 'showcase-sandy-by-anneke',
  shelly: 'showcase-short-sleeve-shelly-rash-guard',
  shin: 'showcase-just-peachy-shin-bee',
  simon: 'showcase-simon-shirt-by-sewingdentist',
  simone: 'showcase-simone-by-gaelle',
  skully: 'showcase-3d-skully',
  sven: 'showcase-french-terry-sven',
  tamiko: 'showcase-a-tamiko-top',
  teagan: 'showcase-teagan-karen',
  tiberius: 'showcase-tiberius-the-tunica',
  titan: 'showcase-a-mock-up-of-titan-with-the-fit-to-knee-option-enabled',
  trayvon: 'showcase-liberty-trayvon',
  tristan: 'showcase-a-lined-tristan-top-with-front-lacing',
  uma: 'showcase-lower-rise-ursula',
  wahid: 'showcase-sterling42-wahid',
  walburga: 'showcase-walburga-the-wappenrock',
  waralee: 'fde729f5-ea72-4af4-b798-331bbce04000',
  yuri: 'showcase-yuri-by-its-designer',
}

/*
 * Same, but with a full href
 */
export const designExampleHrefs = {}
for (const [design, id] of Object.entries(designExampleIds)) {
  designExampleHrefs[design] = `${cloudflare.url}${id}/public`
}
