"use strict"
import { connectDB } from "../../../lib/dbConnect";
import User from "../../../models/user";
import mongoose from 'mongoose'
import Customhero from "../../../models/customhero";
import { decode } from "jsonwebtoken";

export default async function deleteMyHeroHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const current = JSON.parse(req.body);
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const useridMongo = mongoose.Types.ObjectId(userT);
    const heroidMongo = mongoose.Types.ObjectId(current.id);
    const hDelete = await Customhero.findOneAndDelete({$and: [{ userId: useridMongo },{ _id: heroidMongo }]}).exec();
    //validación de contraseña
    console.log("custom hero removido", hDelete);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false });
  }
}
