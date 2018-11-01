import { User, Confirmation } from "../models";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { log, email } from "../utils";
import jwt from "jsonwebtoken";
import config from "../config";

function ConfirmationController() { }

ConfirmationController.prototype.confirm = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  Confirmation.findById(req.body.id, (err, confirmation) => {
    if (err) return res.sendStatus(400);
    if(confirmation === null) return res.sendStatus(401);
    return res.send(confirmation);
  });
}



export default ConfirmationController;
