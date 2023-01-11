import { verify, decode } from "jsonwebtoken";
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import Customhero from "../../../models/customhero";
import Favorite from "../../../models/favorite";
import mongoose from "mongoose";
// import bcrypt from 'bcrypt'

export default async function ProfileHandle(req, res) {
  const { tokenUser } = req.cookies;
  if (!tokenUser) {
    return res.status(401).json({ success: false });
  }
  try {
    const tokenDecode = decode(tokenUser, { complete: true });
    const { userID } = tokenDecode.payload;
    await connectDB();

    const userR = await User.findById(userID);
    const countF = await Favorite.countDocuments({
      userId: mongoose.Types.ObjectId(userID),
    });
    const countCH = await Customhero.countDocuments({
      userId: mongoose.Types.ObjectId(userID),
    });
    if (userR === null) {
      console.log("empty");
      return res.status(401).json({ success: false });
    }
    res.status(200).json({
      success: true,
      user: {
        username: userR.username,
        favorites: countF,
        custom_heros: countCH,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false });
  }
}
