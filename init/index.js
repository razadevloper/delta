// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../model/listing.js");
// const { insertMany } = require("../model/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main().then(() =>{
//     console.log("Connected to DB");
// })
// .catch((err) =>{
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () =>{
//    await Listing.deleteMany({});
//    await Listing.insertMany(initData.data);
//    console.log("Data was initailized");
// };

// initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../model/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main().then(() => {
//   console.log("Connected to DB");
// }).catch((err) => {
//   console.log(err);
// });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({...obj, owner: "6890f5a181639ec0592ef867" }));
//   const modifiedData = initData.data.map(item => ({
//     ...item,
//     image: item.image.url 
//   }));

//   await Listing.insertMany(modifiedData);
//   console.log("Data was initialized");
// };

// initDB();




const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  const modifiedData = initData.data.map(item => ({
    ...item,
    owner: "6890f5a181639ec0592ef867"
  }));

  await Listing.insertMany(modifiedData);
  console.log("Data was initialized");
};

initDB();

