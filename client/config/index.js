const prod = {
    baseUrl: "https://adlmmarketplace.onrender.com",
  };
  
  const dev = {
    baseUrl: "https://adlmmarketplace.onrender.com",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
