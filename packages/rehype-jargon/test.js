import { remark } from 'remark'
import { html } from '
var html = require('remark-html')
var plugin = require('remark-jargon')
var jargon = require('./jargon.js')

remark()
  .use(html)
  .use(plugin, { jargon: jargon })
  .process('This is a plugin for _remark_ originally written for _freesewing_.', function (err, file) {
    console.log(String(file))
  })

