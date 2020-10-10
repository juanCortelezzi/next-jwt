import mongoose from "mongoose";

const connection: any = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    socketTimeoutMS: 30000,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
