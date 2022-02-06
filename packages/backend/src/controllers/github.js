import axios from 'axios'
import config from '../config'

function GithubController() {}

// Create a gist
GithubController.prototype.createGist = function(req, res) {
  if (!req.body.data) return res.sendStatus(400)
  let client = GithubClient()
  client.post('/gists', {
    public: true,
    description: `An open source sewing pattern from freesewing.org`,
    files: {
      'pattern.yaml': { content: req.body.data }
    }
  })
  .then(result => {
    let id = result.data.id
    client.post(`/gists/${id}/comments`, {
      body: `👉 https://freesewing.org/recreate/gist/${id} 👀`
    })
    .then(result => res.send({id}))
    .catch(err => res.sendStatus(500))
  })
  .catch(err => res.sendStatus(500))
}

GithubController.prototype.createIssue = function(req, res) {
  if (!req.body.data) return res.sendStatus(400)
  if (!req.body.design) return res.sendStatus(400)
  let client = GithubClient()
  client.post('/gists', {
    public: true,
    description: `A FreeSewing crash report`,
    files: {
      'pattern.yaml': { content: req.body.data },
      'settings.yaml': { content: req.body.patternProps.settings },
      'events.yaml': { content: req.body.patternProps.events },
      'errors.md': { content: req.body.traces },
      'parts.json': { content: req.body.patternProps.parts },
    }
  })
  .then(gist => {
    client.post('/repos/freesewing/freesewing/issues', {
      title: `Error while drafting ${req.body.design}`,
      body: `An error occured while drafting ${req.body.design} and a [crash report](https://gist.github.com/${gist.data.id}) was generated.`,
      labels: [
        `:package: ${req.body.design}`,
        ':robot: robot'
      ]
    })
    .then(issue => {
      let notify = (typeof config.github.notify.specific[req.body.design] === 'undefined')
        ? config.github.notify.dflt
        : config.github.notify.specific[req.body.design]
      let id = issue.data.number
      let path = `/recreate/gist/${gist.data.id}`
      let body = 'Ping '
      for (const user of notify) body += `@${user} `
      if (req.body.userGithub) body += `@${req.body.userGithub} `
      body += " 👋   \nRecreate this:\n\n"
      body += `- **Workbench**: 👉 https://${req.body.design}.freesewing.dev${path}`
      body += "\n"
      body += `- **Next**: 👉 https://next.freesewing.org${path}`
      body += "\n"
      body += `- **Production**: 👉 https://freesewing.org${path}`
      body += "\n\n"
      if (req.body.userHandle) body += `(user handle: ${req.body.userHandle})`
      client.post(`/repos/freesewing/freesewing/issues/${id}/comments`, { body })
      .then(result => res.send({id}))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
    })
    .catch(err => {
        console.log(err)
      res.sendStatus(500)
    })
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
}

const GithubClient = () => axios.create({
  baseURL: config.github.api,
  timeout: 5000,
  auth: {
    username: config.github.bot.user,
    password: config.github.token
  },
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
})

export default GithubController
