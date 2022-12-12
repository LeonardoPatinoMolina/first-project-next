"use strict";
import {connectDB} from '../../../lib/dbConnect'
import { requestApi } from "../../../Services/requestApi";

export default async function HerosHandler(req, res) {
  try {
    // const cookie = req.headers.cookie;
    const { q } = req.query;
    await connectDB();
    const response = await requestApi(q);
      res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.log('api search', err);
    res.status(400).json({ success: false });
  }
}
