const express = require("express");
const axios = require("axios");
const checkDomain = require("./check");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const isValidDomain = (domain) => {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}$/;
  return domainRegex.test(domain);
};

app.get("/health", (req, res) => {
  res.send("Phishing Checker API");
});

app.post("/check-domain", async (req, res) => {
  const { domain } = req.body;
  console.log("domainn", domain);

  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  if (!isValidDomain(domain)) {
    return res.status(400).json({ error: "Invalid domain format" });
  }

  try {
    const result = await checkDomain(domain);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking the domain" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
