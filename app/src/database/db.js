const mongoose = require("mongoose");

const database = mongoose.connect(
  process.env.DATABASE_URL,
  {
    dbName: 'techmec',
    tlsInsecure: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    // tls: true,
    // tlsCAFile: "./ca-certificate.crt"
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB- techmec");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;
