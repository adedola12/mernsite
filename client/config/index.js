const prod = {
    baseUrl: "https://adlmmarketplace.onrender.com",
  };
  
  const dev = {
    baseUrl: "http://localhost:3000",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
