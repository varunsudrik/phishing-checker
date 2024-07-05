const axios = require("axios");
require("dotenv").config();

const checkDomain = async (domain) => {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "your-company-name",
      clientVersion: "1.5.2",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: `${domain}` }],
    },
  };
  const response = await axios.post(apiUrl, requestBody);
  const data = response.data;

  if (data.matches) {
    return { isPhishing: true, matches: data.matches };
  } else {
    return { isPhishing: false };
  }
};

module.exports = checkDomain;
