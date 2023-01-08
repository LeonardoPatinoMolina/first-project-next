const mongoose = require("mongoose");

const uri = process.env.URI_MONGODB_FINAL;

const connectDB = async () => {
  await mongoose.connect(uri);
};

export {connectDB};
