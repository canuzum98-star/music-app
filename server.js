const express = require("express");
const fs = require("fs");
const multer = require("multer");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "public/uploads/" });

app.get("/api/songs", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json"));
  res.json(data);
});

app.post("/api/add", upload.fields([{ name: "cover" }, { name: "audio" }]), (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json"));

  const song = {
    id: Date.now(),
    title: req.body.title,
    artist: req.body.artist,
    cover: "/uploads/" + req.files.cover[0].filename,
    audio: "/uploads/" + req.files.audio[0].filename
  };

  db.push(song);
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
  res.json({ ok: true });
});

app.listen(3000, () => console.log("🚀 http://localhost:3000"));
