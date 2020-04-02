import mongoose from "mongoose";

const connect: () => Promise<void> = () =>
  mongoose
    .connect(
      `mongodb://${process.env.MK_NODE_MONGO_HOST}:${process.env.MK_NODE_MONGO_PORT}/${process.env.MK_NODE_MONGO_DBNAME}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    .then(() => {
      return console.log(`Successfully connected to the db...`);
    })
    .catch(error => {
      console.log("Error connecting to database: ", error);
      return process.exit(1);
    });

export default connect;
