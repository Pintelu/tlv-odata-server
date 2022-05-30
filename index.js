// routers
const sshRouter = require("./routes/ssh/");

const express = require("express"),
  app = express(),
  cors = require("cors")
  // bodyParser = require("body-parser");

// make server object that contain port property and the value for our server.
var serverProps = {
  port: 4040,
};

// use the modules
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// use router
app.use("/", sshRouter);

// starting the server
var server = app.listen(serverProps.port, () =>
  console.info(`Server started, listening port: ${serverProps.port}`)
);
process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  server.close();
  process.exit(1);
});
