"use strict"
import { decode } from "jsonwebtoken";
import mongoose from 'mongoose';
import User from "../models/user";
import Customhero from "../models/customhero";

export const getCustomHeros = async (cookie) => {
  try {
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.userID;
    const idMongo = mongoose.Types.ObjectId(userC);
    // const { custom_heros } = await User.findById(`${userC}`);
    console.log('buscando...')
    const custom_her = await Customhero.find({userId: idMongo});
    console.log('encontrado')
    const custom_heros = custom_her.map(ch=>{
      return {
        _id: ch._id.toString(),
        userId: ch.userId.toString(),
        name: ch.name,
        img: ch.img,
        history: ch.history,
      }
    });
    console.log('convertido')
    if (custom_heros.length === 0) return null;
    return custom_heros;
  } catch (error) {
    console.log("getCustom***", error);
    return false;
  }
};
