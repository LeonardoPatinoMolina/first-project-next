import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { connectDB, closeDB } from "../../../lib/dbConnect";
import User from "../../../models/user";

export default async function LoginHandler(req, res) {
  
  const { user, pass } = JSON.parse(req.body);
  try {
    await connectDB();
    const userR = await User.findOne({ username: user }).exec();
      if (userR === null) {
        console.log("vacío");
        return res.status(401).json({ success: false });
      }
      userR._id = userR._id.toString();

      //validación de contraseña
      const match = await bcrypt.compare(pass, userR.hashpass);
      if (!match) return res.status(401).json({ success: false });
    } catch (error) {
      console.log("**", error);
      return res.status(401).json({ success: false });
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
        user,
      },
      process.env.SECRET_JWT
    );

    const tokenS = serialize("tokenUser", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "productions",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 3,
      path: "/",
    });
    res.setHeader("Set-Cookie", tokenS);
    res.status(200).json({ success: true });
}
