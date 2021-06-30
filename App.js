const express = require("express");
const app = express();
const DBClient = require("./config/Database");
const port = process.env.PORT || 8080;
DBClient.connect();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});

app.use("/api", require("./routes"));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Node backend listening at http://%s:%s", host, port);
});
