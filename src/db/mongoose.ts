import * as mongoose from "mongoose";

mongoose.connect(
  `mongodb://${process.env.MK_NODE_MONGO_HOST}:${process.env.MK_NODE_MONGO_PORT}/${process.env.MK_NODE_MONGO_DBNAME}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
