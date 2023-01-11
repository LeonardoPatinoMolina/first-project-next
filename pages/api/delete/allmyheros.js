"use strict"
import { connectDB } from "../../../lib/dbConnect";
import mongoose from 'mongoose'
import Customhero from "../../../models/customhero";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const idMongo = mongoose.Types.ObjectId(userT);
    const hDelete = await Customhero.deleteMany({userId: idMongo});
    console.log("update all done", hDelete);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
