const express = require ('express');
const  cors  =  require('cors');
const  dotenv = require('dotenv');
const   mongoose =  require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB).then(()=>console.log('Database Connected Sucessfully'));
};

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, ()=>{
    console.log("Backend connected successfully");
})