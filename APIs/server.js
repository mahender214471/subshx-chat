require("dotenv").config({});
const express = require("express");
const cors = require("cors");
const next = require("next");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { Connectmsql } = require("./models");
const app = express();
const http = require("http").Server(app);
const nextApp = next({ dev: true });
const apiRoutes = require("./routes/apis");
const sockets = require("./sockets");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/api", apiRoutes);
const handle = nextApp.getRequestHandler();
app.get("*", (req, res) => {
  return handle(req, res);
});
const port = process?.env?.PORT || 4040;
http.listen(port, async () => {
  nextApp.prepare();
  console.log(`Server lisnibg at port :- ${port}`);
  Connectmsql();
  sockets(http);
});
