const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/ucfbc14';

connect(connectionString);

module.exports = connection;
