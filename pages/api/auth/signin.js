import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import bcrypt from 'bcrypt'

export default async function SigninHandler(req, res) {
  const { user, pass } = JSON.parse(req.body);

  const hash = await bcrypt.hash(pass, 10)
  await connectDB();
  
  try {
    const userN = new User({
      username: user,
      hashpass: hash,
      favorites: [],
      custom_heros: [],
    });
    userN.save();
    console.log("exito?");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
  res.status(200).json({ success: true });
}
