import Controller from '../controllers/github'

const Github = new Controller()

export default (app, passport) => {
  app.post('/github/issue', Github.createIssue)
  app.post('/github/gist', Github.createGist)
}
