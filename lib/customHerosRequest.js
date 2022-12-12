"use strict"
import { decode } from "jsonwebtoken";
import User from "../models/user";

export const getCustomHeros = async (cookie) => {
  try {
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.user;
    const { custom_heros } = await User.findOne({ username: `${userC}` }).exec();
    if (custom_heros.length === 0) return null;
    return custom_heros;
  } catch (error) {
    console.log("getFav***", error);
    return false;
  }
};
