"use strict"
import { connectDB, closeDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.user;
    await connectDB();
    const userUp = await User.findOneAndUpdate(
      { username: `${userT}` },
      { favorites: [] }
      );
      
    
    console.log("update all done");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
