"use strict";
import { decode } from "jsonwebtoken";
import User from "../models/user";

export const getFavoriteStatus = async (cookie, current) => {
  try {
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.user;
    const { favorites } = await User.findOne({ username: `${userC}` }).exec();
    if (favorites.length === 0) return { ...current, isFavorite: false };
    const validation = favorites.map(
      (fav) => `${fav.name}`.trim() === `${current.name}`.trim()
    );
    const val = validation.includes(true);
    return { ...current, isFavorite: val };
  } catch (error) {
    console.log("getFav***", error);
    return false;
  }
};
