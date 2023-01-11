import {connectDB} from '../../../lib/dbConnect'
import Username from '../../../models/username'

export default async function handleUsername(req, res){
  try{
    const { username } = JSON.parse(req.body);
  await connectDB();
  const userNR = await Username.findOne({ name: username }).lean();
  
  if (userNR === null) {
    console.log("vacío");
    return res.status(200).json({ success: false, details: 'vacio' });
  }
  console.log('exito?');
  res.status(200).json({success: true, details: 'the username already exist'})
} catch (error) {
  console.log(error);
  return res.status(500).json({ success: false, details: error });
}
}