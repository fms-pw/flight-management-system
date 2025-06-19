import mongoose from "mongoose";

const establishDBConnection = async () => {
  try {
    const mongoURI = `${process.env.MONGO_DB_URI}`;
    await mongoose.connect(mongoURI);
    console.log(`MongoDB Connection Established
        MongoDBHost : ${process.env.MONGO_DB_URI}
        Database : ${process.env.DB_NAME}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Failed!
      ${error.name}
      ${error.message}\n`);
    return false;
  }
};

export default establishDBConnection;
