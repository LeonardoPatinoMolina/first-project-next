const Favorite = require("./models/Favorite");
const connectDB = require("./lib/dbConnect");

const epa = async () => {
  await connectDB();
  try{const favN = new Favorite({
    name: "Rosado palido",
    img: "http://i.annihil.us/u/prod/marvel/i/mg/9/80/4de932f1a298a.jpg",
  });
  favN.save();
  console.log('exito?')
  }
  catch(err){
    console.log(err);
  }
};

epa();