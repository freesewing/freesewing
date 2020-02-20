import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import formidable from 'formidable'
import shellExec from 'shell-exec'

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '5mb'}))
const port = process.env.PORT || 4000
const formats = ['pdf', 'ps']
const sizes = ['full', 'a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid']

app.get('/', async (req, res) => res.sendFile(path.resolve(__dirname + '/form.html')))
app.post('/', async (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (
      err ||
      typeof files.svg === 'undefined' ||
      formats.indexOf(fields.format) === -1 ||
      sizes.indexOf(fields.size) === -1
    )
      return res.sendFile(path.resolve(__dirname + '/form.html'))
    let upload = files.svg.path
    let cmd
    if (fields.size === 'full') {
      // Do not tile
      let target = `/tmp/pattern.${fields.format}`
      cmd = `/usr/bin/inkscape --export-${fields.format}=${target} ${upload}`
      shellExec(cmd).then(() => {
        return res.sendFile(target)
      })
    } else {
      // Do tile
      let untiled = '/tmp/untiled.ps'
      let tiled = '/tmp/tiled.ps'
      cmd = `/usr/bin/inkscape --export-ps=${untiled} ${upload}`
      shellExec(cmd).then(() => {
        cmd = `/usr/local/bin/tile -a -m${
          fields.size
        } -s1 -t"On-demand tiler" ${untiled} > ${tiled}`
        shellExec(cmd).then(() => {
          if (fields.format === 'ps') return res.sendFile(tiled)
          cmd = `/usr/bin/ps2pdf14 ${tiled} ${tiled}.pdf`
          shellExec(cmd).then(() => {
            return res.sendFile(tiled + '.pdf')
          })
        })
      })
    }
  })
})

app.post('/api', async (req, res) => {
  if (
    typeof req.body.svg === 'undefined' ||
    typeof req.body.format === 'undefined' ||
    typeof req.body.size === 'undefined' ||
    formats.indexOf(req.body.format) === -1 ||
    sizes.indexOf(req.body.size) === -1
  )
    return res.sendStatus(400)
  let storage = '/fs/storage/tmp/'
  let dir = createTempDir(storage)
  let svg = storage + dir + '/draft.svg'
  let cmd = ''
  // Save svg to disk
  fs.writeFile(svg, req.body.svg, err => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    let target = storage + dir + '/pattern-' + req.body.size
    if (req.body.size === 'full') {
      // Do not tile
      if (req.body.format === 'ps') {
        target += '.ps'
        cmd = '/usr/bin/inkscape --export-ps=' + target + ' ' + svg
        shellExec(cmd).then(() => {
          return res.send({ link: process.env.TILER_DOWNLOAD + '/tmp/' + dir + '/pattern-full.ps' })
        })
      } else {
        target += '.pdf'
        cmd = '/usr/bin/inkscape --export-pdf=' + target + ' ' + svg
        shellExec(cmd).then(() => {
          return res.send({
            link: process.env.TILER_DOWNLOAD + '/tmp/' + dir + '/pattern-full.pdf'
          })
        })
      }
    } else {
      // Do tile
      target += '.pdf'
      let untiled = storage + dir + '/untiled.ps'
      let tiled = storage + dir + '/tiled.ps'
      cmd = `/usr/bin/inkscape --export-ps=${untiled} ${svg}`
      shellExec(cmd).then(() => {
        cmd = `/usr/local/bin/tile -a -m${
          req.body.size
        } -s1 -t"freesewing.org" ${untiled} > ${tiled}`
        console.log('tile cmd', cmd)
        shellExec(cmd).then(() => {
          cmd = `/usr/bin/ps2pdf14 ${tiled} ${target}`
          shellExec(cmd).then(() => {
            return res.send({
              link:
                process.env.TILER_DOWNLOAD + '/tmp/' + dir + '/pattern-' + req.body.size + '.pdf'
            })
          })
        })
      })
    }
  })
})

const createTempDir = folder => {
  let dir = newDir()
  let path = folder + dir
  fs.mkdirSync(path, { recursive: true }, err => {
    if (err) console.log('mkdirFailed', err)
  })

  return dir
}

const newDir = (length = 10) => {
  let dir = ''
  let possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++)
    dir += possible.charAt(Math.floor(Math.random() * possible.length))

  return dir
}

app.listen(port, err => {
  console.log(`> listening on port ${port}`)
})
