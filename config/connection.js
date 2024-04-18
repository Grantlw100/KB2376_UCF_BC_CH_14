const { connect, connection } = require("mongoose");
console.log(process.env.MONGODB_URI);
const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  console.error('MongoDB connection string is missing!', connectionString);
  process.exit(1);  
}

connect(connectionString);

module.exports = connection;
