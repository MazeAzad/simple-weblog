const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MogoDB Connected:${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
