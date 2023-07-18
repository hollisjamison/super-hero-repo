const express = require("express");
const {
  searchAllHeroesController,
  addHeroController,
  renderHeroesPageController,
  getOneHeroController,
  getAllHeroesController,
  verifySlug,
} = require("./controllers/controllers");

const cors = require('cors')
const path = require("path");
const app = express();

app.use(cors())
// To support React, we need to enable static files
app.use(express.static('client/build'));

// GET: Get ONE hero
app.get("/api/heroes/:slug", verifySlug, getOneHeroController);

// GET: Search heroes
app.get("/api/search/heroes/:searchTerm", searchAllHeroesController);

// GET: All heroes route
app.get("/api/heroes", getAllHeroesController);

// POST: Add one hero
app.post("/api/heroes", express.json(), addHeroController);


// to support react, we send all requests that do not match our API routes to the index.html of our react site
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(1338, () => {
  console.log("Now listening on http://localhost:1338");
});
