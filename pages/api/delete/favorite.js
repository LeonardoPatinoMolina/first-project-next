"use strict"
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import mongoose from 'mongoose'
import Favorite from "../../../models/favorite";
import { decode } from "jsonwebtoken";

export default async function deleteFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const current = JSON.parse(req.body);
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const idMongo = mongoose.Types.ObjectId(userT);
    const favorite = await Favorite.findOneAndDelete({$and: [{userId: idMongo},{name: current.name},]});
    //validación de contraseña
    console.log("delete fav done");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
