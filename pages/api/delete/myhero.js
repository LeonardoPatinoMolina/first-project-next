"use strict"
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const current = JSON.parse(req.body);
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.user;
    await connectDB();
    const userR = await User.findOne({ username: `${userT}` }).exec();
    //validación de contraseña
    console.log("usuario encontrado");
    let customheros = userR.custom_heros.filter(f => f.id !== current.id);
    console.log("custom hero removido");
    const userUp = await User.findOneAndUpdate(
      { username: `${userT}` },
      { custom_heros: customheros }
    );
    console.log("update done");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
