"use strict";
import { connectDB } from "../../../lib/dbConnect";
import mongoose from "mongoose";
import User from "../../../models/user";
import Username from "../../../models/username";
import Favorite from "../../../models/favorite";
import Customhero from "../../../models/customhero";
import { decode } from "jsonwebtoken";

export default async function DeleteAcountHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const idMongo = mongoose.Types.ObjectId(userT);
    const deleteUserR = await User.findByIdAndDelete(userT);
    const deleteUsernameR = await Username.deleteOne({ userId: idMongo });
    const deleteCustomheroR = await Customhero.deleteMany({ userId: idMongo });
    const deleteFavorite = await Favorite.deleteMany({ userId: idMongo });
    console.log(
      "delete user done",
      deleteUserR,
      deleteCustomheroR,
      deleteFavorite,
      deleteUsernameR
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
