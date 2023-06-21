const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connecting = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected to ${connecting.connection.host} `.bgCyan.bold
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
