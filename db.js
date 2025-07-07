const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

require("dotenv").config();

// Credenciais do DB
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

async function main() {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@projectapi.mkgylgr.mongodb.net/?retryWrites=true&w=majority&appName=ProjectAPI`
  );

  console.log("Conexão bem sucedida.");
}
main().catch((err) => console.log(err));

module.exports = main;
