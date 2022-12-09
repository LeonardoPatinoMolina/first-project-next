"use strict";
import { connectDB } from "./dbConnect";
import { decode } from "jsonwebtoken";
import User from "../models/user";

export const getFavoriteStatus = async (cookie, current) => {
  try {
    await connectDB();
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.user;
    const { favorites } = await User.findOne({ username: `${userC}` }).exec();

    if (favorites.length < 1) return { ...current, isFavorite: false };
    const validation = favorites.map((fav) => fav.name === current.name);
    const val = validation.includes(true);
    return { ...current, isFavorite: val };
  } catch (error) {
    console.log("getFav***", error);
    return false;
  }
};
