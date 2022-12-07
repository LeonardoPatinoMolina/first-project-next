const mongoose = require("mongoose");

const uri = 'mongodb://127.0.0.1:27017/test';
// const uri = 'mongodb://127.0.0.1:27017/test'
// const uri = 'mongodb://127.0.0.1:27017/mongodb+srv://youtube_prueba:mangapio@cluster0.rvb6urq.mongodb.net/Movies'


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
