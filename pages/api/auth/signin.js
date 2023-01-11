import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import Username from "../../../models/username";
import bcrypt from 'bcrypt'

export default async function SigninHandler(req, res) {
  const { user, pass } = JSON.parse(req.body);
  await connectDB();
  const userR = await Username.findOne({ name: user }).lean();
  if (userR !== null) {
    return res.status(400).json({ success: false });
  }
  const hash = await bcrypt.hash(pass, 10)
  try {
    const userNew = new User({
      username: user,
      hashpass: hash
    });
    const saveUser = await userNew.save();
    const usernameN = new Username({
      name: user,
      userId: saveUser._id
    })
    usernameN.save();
    
    console.log("exito?");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
  res.status(200).json({ success: true });
}
