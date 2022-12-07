import { verify } from "jsonwebtoken";

export default function profileHandle(req, res) {
  const { tokenUser } = req.cookies;
  if(!tokenUser){
    return res.status(401).json({success: false});
  }
  try {
    const user = verify(tokenUser, process.env.SECRET_JWT);
    console.log(user);
    res.status(200).json({ success: true});
  } catch (error) {}
    res.status(401).json({ success: false });
}
