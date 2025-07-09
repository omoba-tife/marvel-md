const express = require("express");
const path = require("path");
let qrwa = null;

function connect(conn, PORT) {
  const app = express();

  app.enable("trust proxy");
  app.set("json spaces", 2);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    if (qrwa) return res.type(".jpg").send(qrwa);
    res.sendFile(path.join(__dirname, "marvelpage", "marvel.html"));
  });

  app.listen(PORT, () => {
    console.log(`BOT RUNNING ON PORT ${PORT}`);
  });
}

module.exports = connect;
