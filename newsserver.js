import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Serve all static files (news.html, style.css, app.js, images, etc.)
app.use(express.static("./"));

// Serve news.html when visiting the root URL
app.get("/", (_req, res) => {
  res.sendFile("news.html", { root: "." });
});

const API_KEY = process.env.NEWS_API_KEY;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Simple rephrasing function
function rephrase(text) {
  return text
    .replace(/says/gi, "states")
    .replace(/warns/gi, "alerts")
    .replace(/reveals/gi, "uncovers")
    .replace(/calls/gi, "urges");
}

app.get("/api/news", async (_req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const data = await response.json();

    const articles = data.articles.map(a => ({
      original: a.title,
      rephrased: rephrase(a.title),
      url: a.url,
      source: a.source.name
    }));
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});