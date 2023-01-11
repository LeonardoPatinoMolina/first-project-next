"use strict"
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import mongoose from 'mongoose'
import Favorite from "../../../models/favorite";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const idMongo = mongoose.Types.ObjectId(userT);
    const deleteDone = await Favorite.deleteMany({userId: idMongo});

    console.log("delete all done");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("delete fav**", error);
    res.status(400).json({ success: false });
  }
}
