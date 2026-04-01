import { nanoid } from "nanoid";

import Url from "../models/Url.js";
import { isValidUrl } from "../utils/utils.js";

const createShortUrl = async (req, res) => {
  try {
    let { originalUrl } = req.body;

    originalUrl = originalUrl?.trim();
    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Add https if missing
    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = "https://" + originalUrl;
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortId;

    while (true) {
      try {
        shortId = nanoid(8);
        await Url.create({ originalUrl, shortId });
        break;
      } catch (err) {
        if (err.code === 11000) continue; // retry if duplicate
        throw err;
      }
    }

    return res.status(201).json({
      shortId,
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
      originalUrl,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const shortUrl = await Url.findOne({ shortId });

    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    shortUrl.clicks++;
    await shortUrl.save();

    return res.redirect(shortUrl.originalUrl);
  } catch (error) {
    console.error("Error retrieving original URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createShortUrl, getOriginalUrl };
