const express = require("express");
const cors = require("cors");
//const fetch = require("node-fetch");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "https://nighti-jq3xdi1kx-prahaladhs-projects.vercel.app/",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "'Authorization'"],
  })
);

// Route for fetching movies based on search
app.get("/movies", async (req, res) => {
  const search = req.query.s; // 'search' query parameter from frontend
  const apikey = "48bd2643";

  if (!search) {
    return res.status(400).json({ error: "Missing 'search' query parameter" });
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&s=${search}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Route for fetching a single movie (Test page functionality)
app.get("/movie", async (req, res) => {
  const movieId = req.query.id; // 'id' query parameter from frontend
  const apikey = "48bd2643";

  if (!movieId) {
    return res.status(400).json({ error: "Missing 'id' query parameter" });
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or fallback to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
