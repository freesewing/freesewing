import mongoose from "mongoose";
import CommentModel from "./comment";
import ConfirmationModel from "./confirmation";
import ModelModel from "./model";
import UserModel from "./user";
import DraftModel from "./draft";

export const Comment = CommentModel;
export const Confirmation = ConfirmationModel;
export const Model = ModelModel;
export const User = UserModel;
export const Draft = DraftModel;
