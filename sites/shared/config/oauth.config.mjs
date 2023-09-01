export const oauthConfig = {
  github: {
    clientId: 'e1acc4ff320d84bfe44d',
    url: (state) =>
      `https://github.com/login/oauth/authorize?client_id=e1acc4ff320d84bfe44d&redirect_uri=https://localhost:8000/login/callback/github&scope=read:user user:email&state=${state}`,
  },
  google: {
    clientId: '316708420427-4spj1rj2ekgke887ng5dsi1bsu8bcg8j.apps.googleusercontent.com',
    url: (state) => `fixme`,
  },
}
/*
export const foo = {
  github:
    'https://github.com/login/oauth/authorize' +
    '?client_id=' +
    githubClientId,
    '&redirect_uri=' +
    `${process.env.GATSBY_BACKEND}oauth/callback/from/github` +
    '&scope=' +
    'read:user user:email' +
    '&state=',
  google:
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?response_type=code' +
    '&client_id=' +
    process.env.GATSBY_GOOGLE_CLIENT_ID +
    '&redirect_uri=' +
    `${process.env.GATSBY_BACKEND}oauth/callback/from/google` +
    '&scope=' +
    'https://www.googleapis.com/auth/userinfo.profile' +
    ' ' +
    'https://www.googleapis.com/auth/userinfo.email' +
    '&access_type=online' +
    '&state=',
}
*/
