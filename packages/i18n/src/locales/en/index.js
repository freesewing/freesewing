import account from './account.yaml'
import app from './app.yaml'
import cfp from './cfp.yaml'
import cty from './cty.yaml'
import email from './email.yaml'
import errors from './errors.yaml'
import filter from './filter.yml'
import gdpr from './gdpr.yaml'
import i18n from './i18n.yaml'
import intro from './intro.yaml'
import measurements from './measurements.yaml'
import options from './options/'
import optiongroups from './optiongroups.yaml'
import parts from './parts.yaml'
import patterns from './patterns.yml'
import plugin from './plugin/'
import settings from './settings.yml'
import welcome from './welcome.yaml'

import jargonFile from './jargon.yml'

const topics = {
  account,
  app,
  cfp,
  cty,
  email,
  errors,
  filter,
  gdpr,
  i18n,
  intro,
  measurements,
  options,
  optiongroups,
  parts,
  patterns,
  plugin,
  settings,
  welcome,
}

const strings = {}

for (let topic of Object.keys(topics)) {
  for (let id of Object.keys(topics[topic])) {
    if (typeof topics[topic][id] === 'string') strings[topic + '.' + id] = topics[topic][id]
    else {
      for (let key of Object.keys(topics[topic][id])) {
        if (typeof topics[topic][id][key] === 'string')
          strings[topic + '.' + id + '.' + key] = topics[topic][id][key]
        else {
          for (let subkey of Object.keys(topics[topic][id][key])) {
            if (typeof topics[topic][id][key][subkey] === 'string')
              strings[topic + '.' + id + '.' + key + '.' + subkey] = topics[topic][id][key][subkey]
            else {
              for (let subsubkey of Object.keys(topics[topic][id][key][subkey])) {
                if (typeof topics[topic][id][key][subkey][subsubkey] === 'string')
                  strings[topic + '.' + id + '.' + key + '.' + subkey + '.' + subsubkey] =
                    topics[topic][id][key][subkey][subsubkey]
                else {
                  console.log('Depth exceeded!', topic, id, key, subkey, subsubkey)
                }
              }
            }
          }
        }
      }
    }
  }
}

const jargon = {}
for (let entry in jargonFile) {
  jargon[jargonFile[entry].term] = jargonFile[entry].description
}

export default {
  strings,
  plugin,
  jargon,
  topics,
}
