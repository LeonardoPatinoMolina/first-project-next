const mongoose = require("mongoose");

const uri = process.env.URI_MONGODB;

const connectDB = async () => {
  await mongoose.connect(uri);
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("database is open");
  });

  mongoose.connection.on("connected", () => {
    console.log("database is connected to", uri);
  });
  db.once("error", (err) => {
    console.log("database error", err);
  });
};

export {connectDB};
