import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like CSS, JS, images)
app.use(express.static(__dirname));

// Serve news.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "news.html"));
});

const API_KEY = process.env.NEWS_API_KEY;
const PORT = process.env.PORT || 3000;

// Simple rephrasing function
function rephrase(text) {
  return text
    .replace(/says/gi, "states")
    .replace(/warns/gi, "alerts")
    .replace(/reveals/gi, "uncovers")
    .replace(/calls/gi, "urges");
}

// API endpoint
app.get("/api/news", async (_req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const data = await response.json();

    const articles = data.articles.map((a) => ({
      original: a.title,
      rephrased: rephrase(a.title),
      url: a.url,
      image: a.urlToImage,
      source: a.source.name,
    }));

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
