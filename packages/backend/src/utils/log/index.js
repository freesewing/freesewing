import dateFormat from "dateformat";

// FIXME: This needs work

const now = () => dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

const logWorthy = (msg, data) => {
  let d = {at: now()};
  switch(msg) {
    case 'login':
    case 'wrongPassword':
      d.user = data.user.handle;
      d.from = data.req.ip;
      d.with = data.req.headers['user-agent'];
      break;
  }

  return d;
}


const log = (type, msg, data) => {
  console.log(type, msg, logWorthy(msg, data));
}


log.info = (msg, data) => log('info', msg, data);
log.warning = (msg, data) => log('warning', msg, data);
log.error = (msg, data) => log('error', msg, data);


export default log;
