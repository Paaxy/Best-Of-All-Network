import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("./")); // Serve index.html, style.css, app.js

const API_KEY = process.env.NEWS_API_KEY;

// Simple rephrasing function
function rephrase(text) {
  return text
    .replace(/says/gi, "states")
    .replace(/warns/gi, "alerts")
    .replace(/reveals/gi, "uncovers")
    .replace(/calls/gi, "urges");
}

app.get("/api/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const data = await response.json();

    const articles = data.articles.map(a => ({
      original: a.title,
      rephrased: rephrase(a.title),
      url: a.url,
      image: a.urlToImage
    }));

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(3000, () => {
  console.log("🌐 Server running at http://localhost:3000");
});
