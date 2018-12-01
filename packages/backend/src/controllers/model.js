import { User, Model } from "../models";
import { log } from "../utils";

function ModelController() { }

// CRUD basics
ModelController.prototype.create = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    let handle = uniqueHandle();
    let model = new Model({
      handle,
      user: user.handle,
      name: req.body.name,
      units: req.body.units,
      breasts: req.body.breasts,
      created: new Date(),
    });
    model.save(function (err) {
      if (err) {
        log.error('modelCreationFailed', user);
        console.log(err);
        return res.sendStatus(500);
      }
      log.info('modelCreated', { handle: model.handle });
      return res.send({ model });
    });
  });
}

ModelController.prototype.read = function (req, res) { }

ModelController.prototype.update = (req, res) => {
  var async = 0;
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, async (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    Model.findOne({ handle: req.params.handle }, (err, model) => {
      if(err || model === null) return res.sendStatus(400);
      let data = req.body;
      if(typeof data.name === 'string') model.name = data.name;
      if(typeof data.notes === 'string') model.notes = data.notes;
      if(typeof data.units === 'string') model.units = data.units;
      if(typeof data.breasts === 'string' ) model.breasts = (data.breasts === "true") ? true : false;
      if(typeof data.measurements !== 'undefined' ) model.measurements = {
        ...model.measurements,
        ...data.measurements
      };
    // Below are async ops, need to watch out when to save
/*
    if(typeof data.newPassword === 'string' && typeof data.currentPassword === 'string') {
      user.verifyPassword(data.currentPassword, (err, valid) => {
        if (err) return res.sendStatus(400);
        else {
          if (!valid) return res.sendStatus(403);
          user.password = data.newPassword;
          return saveAndReturnAccount(res, user);
        }
      });
    }

    // Image upload is a bit different
    else if(req.headers['content-type'].indexOf("multipart/form-data;") !== -1) {
      let type, form;
      form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        saveAvatar(files.picture, user.handle);
        user.picture = user.handle+"."+imageType(files.picture.type);
        return saveAndReturnModel(res, model);
        })
    }

    else return saveAndReturnModel(res, model);
    */
      return saveAndReturnModel(res, model);
    });
  });
}

ModelController.prototype.delete =  function (req, res) { }

function saveAndReturnModel(res,model) {
  model.save(function (err, updatedModel) {
    if (err) {
      log.error('modelUpdateFailed', updatedModel);
      return res.sendStatus(500);
    }
    return res.send({ model: updatedModel.info() });
  })
}



// Delete multiple
ModelController.prototype.deleteMultiple = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body.models) return res.sendStatus(400);
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    let models = req.body.models;
    if(models.length < 1) return res.sendStatus(400);
    let handles = [];
    for(let handle of models) handles.push({ handle });
    Model.deleteMany({
      user: user.handle,
      $or: handles
    }, (err) => {
      if(err) return res.sendStatus(500);
      const models ={};
      Model.find({user: user.handle}, (err, modelList) => {
        if(err) return res.sendStatus(400);
        for ( let model of modelList ) models[model.handle] = model;
        res.send({ models });
      });
    });
  });
}


// Clone
ModelController.prototype.clone = function (req, res) { }

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
    Model.findOne({ handle: handle }, (err, model) => {
      if(model !== null) exists = true;
    });
  } while (exists !== false);

  return handle;
}


export default ModelController;
