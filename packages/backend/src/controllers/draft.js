import { User, Draft } from "../models";
import { log } from "../utils";

function DraftController() { }

// CRUD basics
DraftController.prototype.read = (req, res) => { }

DraftController.prototype.create = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    let handle = uniqueHandle();
    let draft = new Draft({
      handle,
      user: user.handle,
      name: handle,
      gist: req.body.gist,
      created: new Date(),
    });
    draft.save(function (err) {
      if (err) {
        log.error('draftCreationFailed', user);
        console.log(err);
        return res.sendStatus(500);
      }
      log.info('draftCreated', { handle: draft.handle });
      const drafts ={};
      Draft.find({user: user.handle}, (err, draftList) => {
        if(err) return res.sendStatus(400);
        for ( let draft of draftList ) drafts[draft.handle] = draft;
        return res.send({ handle, drafts });
      });
    });
  });
}

DraftController.prototype.readGist = (req, res) => {
  Draft.findOne({ handle: req.params.handle }, (err, draft) => {
    if(err || draft === null) return res.sendStatus(400);
    return res.send(draft.asGist());
  });
}

DraftController.prototype.update = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, async (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    Draft.findOne({ handle: req.params.handle }, (err, draft) => {
      if(err || draft === null) return res.sendStatus(400);
      if(typeof req.body.name === 'string') draft.name = req.body.name;
      if(typeof req.body.notes === 'string') draft.notes = req.body.notes;
      return saveAndReturnDraft(res, draft);
    });
  });
}

DraftController.prototype.delete = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, async (err, user) => {
    if(err || user === null) return res.sendStatus(400);
      Draft.deleteOne({ handle: req.params.handle, user: user.handle }, (err) => {
        if (err) return res.sendStatus(400);
        else return res.sendStatus(204);
      });
    });
}

// Delete multiple
DraftController.prototype.deleteMultiple = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body.drafts) return res.sendStatus(400);
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    let drafts = req.body.drafts;
    if(drafts.length < 1) return res.sendStatus(400);
    let handles = [];
    for(let handle of drafts) handles.push({ handle });
    Draft.deleteMany({
      user: user.handle,
      $or: handles
    }, (err) => {
      if(err) return res.sendStatus(500);
      const drafts ={};
      Draft.find({user: user.handle}, (err, draftList) => {
        if(err) return res.sendStatus(400);
        for ( let draft of draftList ) drafts[draft.handle] = draft;
        res.send({ drafts });
      });
    });
  });
}




function saveAndReturnDraft(res, draft) {
  draft.save(function (err, updatedDraft) {
    if (err) {
      log.error('draftUpdateFailed', updatedDraft);
      return res.sendStatus(500);
    }
    return res.send({ draft: updatedDraft.info() });
  })
}

const newHandle = (length = 5) => {
	let handle = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++)
    handle += possible.charAt(Math.floor(Math.random() * possible.length));

  return handle;
}

const uniqueHandle = () => {
  let handle, exists;
  do {
    exists = false;
    handle = newHandle();
    Draft.findOne({ handle: handle }, (err, draft) => {
      if(draft !== null) exists = true;
    });
  } while (exists !== false);

  return handle;
}

export default DraftController;
