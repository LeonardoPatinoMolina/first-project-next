"use strict";
import { connectDB } from "../../../lib/dbConnect";
import mongoose from "mongoose";
import Customhero from "../../../models/customhero";
import { decode } from "jsonwebtoken";

export default async function newFavoriteHandle(req, res) {
  try {
    const { tokenUser } = req.cookies;
    const newCustom = JSON.parse(req.body);
    const tokenDecode = decode(tokenUser, { complete: true });
    const userT = tokenDecode.payload.userID;
    await connectDB();
    const idMongo = mongoose.Types.ObjectId(userT);
    const custom_heros = await Customhero.find({ userId: idMongo });
    let herosC = custom_heros;
    //control de limite de heroes creados (12)
    if (herosC.length >= 12)
      return res.status(500).json({ success: false, limitControl: true });
    //registro en modelo de custom_hero
    const customH = new Customhero({
      userId: mongoose.Types.ObjectId(userT),
      name: newCustom.name,
      img: newCustom.img,
      history: newCustom.history,
    });
    customH.save();
    console.log("custom añadido a documento customhero");
    res.status(200).json({ success: true, limitControl: false });
  } catch (error) {
    console.log("**", error);
    res.status(400).json({ success: false, limitControl: false });
  }
}
