"use strict"
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import Username from "../../../models/username";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.user;
    await connectDB();
    const deleteUserR = await User.findOneAndDelete({ username: `${userT}` });
    console.log("delete user done");
    const deleteUserNameR = await Username.findOneAndDelete({ name: `${userT}` });
    console.log("delete username done");
    //validación de contraseña
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}