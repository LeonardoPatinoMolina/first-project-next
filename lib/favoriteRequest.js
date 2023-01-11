"use strict";
import { decode } from "jsonwebtoken";
import mongoose from 'mongoose'
import User from "../models/user";
import Favorite from "../models/favorite";

export const getFavoriteStatus = async (cookie, current) => {
  try {
    const cookieValue = cookie.replace(/^tokenUser=/, "");
    const tokenDecode = decode(cookieValue, { complete: true });
    const userC = tokenDecode.payload.userID;
    const idMongo = mongoose.Types.ObjectId(userC);

    const favorites = await Favorite.find({userId: idMongo}).exec();
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
