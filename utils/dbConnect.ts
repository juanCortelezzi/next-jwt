import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 30000,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(`connected: ${connection.isConnected}`);
}

export default dbConnect;
