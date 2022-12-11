import { verify, decode } from "jsonwebtoken";
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
// import bcrypt from 'bcrypt'

export default async function profileHandle(req, res) {
  const { tokenUser } = req.cookies;
  if (!tokenUser) {
    return res.status(401).json({ success: false });
  }
  try {
    const tokenDecode = decode(tokenUser, { complete: true });
    const { user } = tokenDecode.payload;
    await connectDB();
    const userR = await User.findOne({ username: `${user}` }).exec();
    if (userR === null) {
      console.log("vacío");
      return res.status(401).json({ success: false });
    }
    res.status(200).json({
      success: true,
      user: {
        username: userR.username,
        favorites: userR.favorites.length,
        custom_heros: userR.custom_heros.length,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false });
  }
}
