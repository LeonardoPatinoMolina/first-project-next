import { verify } from "jsonwebtoken";
import cookie from 'cookie'

export default function LogoutHandler(req, res) {
  const { tokenUser } = req.cookies;
  if (!tokenUser) {
    return res.status(401).json({ success: false });
  }
  try {
    verify(tokenUser, process.env.SECRET_JWT);
    const serialized = cookie.serialize('tokenUser', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "productions",
      sameSite: "strict",
      maxAge:  0,
      path: "/",
    })
    res.setHeader('Set-Cookie', serialized)
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({ success: false });
  }
}
