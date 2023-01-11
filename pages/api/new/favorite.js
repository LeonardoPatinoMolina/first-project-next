import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import mongoose from 'mongoose'
import Favorite from "../../../models/favorite";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const newFav = JSON.parse(req.body);
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    //agregado a modelo faborite
    const newF = new Favorite({
      userId: mongoose.Types.ObjectId(userT),
      id: `${newFav.id}`,
      name: newFav.name,
      img: newFav.img,
    });
    console.log("guardando en documento favorites");
    newF.save();
    console.log("favorito añadido");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
