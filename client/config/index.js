const prod = {
    baseUrl: "https://adlmmarketplace-git-main-adedola12s-projects.vercel.app",
  };
  // http://localhost:3000
  const dev = {
    baseUrl: "http://localhost:3000",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
