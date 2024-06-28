// http://localhost:5173
// https://mernsite-k2ky.onrender.com

const prod = {
  baseUrl: "https://adlmmarketplace.onrender.com",
};

// http://localhost:3000
// "https://adlmmarketplace.onrender.com
// https://mernsite-k2ky.onrender.com
const dev = {
  baseUrl: "https://adlmmarketplace.onrender.com",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
