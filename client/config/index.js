// http://localhost:5173
// https://mernsite-k2ky.onrender.com

const prod = {
    baseUrl: "https://mernsite-k2ky.onrender.com",
  };
  const dev = {
    baseUrl: "http://localhost:5173",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
