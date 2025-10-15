import dotenv from "dotenv";
dotenv.config();

import DBconnect from "./config/db.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

DBconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB:", error.message);
  });
