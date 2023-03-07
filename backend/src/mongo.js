const mongoose = require("mongoose");
const connectionString = `mongodb+srv://<your_account>@cluster0.sbhcoi8.mongodb.net/?retryWrites=true&w=majority`;
// - MongooseError: Can't call `openUri()` on an active connection with different connection strings.
// Make sure you aren't calling `mongoose.connect()` multiple times.
// use mongoose.createConnection()
//   - https://mongoosejs.com/docs/connections.html#multiple_connections
//   - it is saying that we need to connect to multiple clusters, but we only have one cluster
// actually, we connect to database cluster once, and model to collections each time
const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connector;
