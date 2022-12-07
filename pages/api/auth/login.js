import db from "../../../db.json";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function LoginHandler(req, res) {
  const { user, pass } = JSON.parse(req.body);
  let ur;
  for (const i of db) {
    if (i.user === user && i.pass === pass) ur = true;
    else ur = false;
  }
  if (ur) {
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
      maxAge:  1000 * 60 * 60 * 24 * 3,
      path: "/",
    });
    res.setHeader("Set-Cookie", tokenS);
    res.status(200).json({success: true});
  }else{
    res.status(401).json({success: false});
  }
}
