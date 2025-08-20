const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
  await initDB(); // call initDB here after connection
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    initData.data=initData.data.map((obj)=>({...obj,owner:'689ba9f8571cb30dbad99458'}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};
