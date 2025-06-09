// http://localhost:5173
// https://mernsite-k2ky.onrender.com

const prod = {
  baseUrl: "https://adlmmarketplace-m9fk.onrender.com",
};

// http://localhost:3000
// "https://adlmmarketplace-m9fk.onrender.com
// https://mernsite-k2ky.onrender.com

// PLEASE DO NOT CHANGE THE VALUE IN THE dev.baseUrl
const dev = {
  baseUrl: "http://localhost:5173",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
