const prod = {
    baseUrl: "https://mernsite-frontend.onrender.com",
  };

  // http://localhost:3000
  // "https://adlmmarketplace.onrender.com
  // https://mernsite-k2ky.onrender.com
  const dev = {
    baseUrl: "/",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
