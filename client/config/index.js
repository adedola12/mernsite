const prod = {
    baseUrl: "https://adlmmarketplace.onrender.com",
  };
  
  const dev = {
    baseUrl: "https://mernsite-k2ky.onrender.com",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
