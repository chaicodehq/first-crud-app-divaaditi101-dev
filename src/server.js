import "dotenv/config"; 
import { createApp } from "./app.js";
import { connectDB } from "./db/connect.js";

async function start() {
  // Read PORT from .env, fall back to 3000 if not set
  const port = process.env.PORT || 3000;

  // Read MONGO_URI from .env, fall back to local MongoDB if not set
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/todo_api_lab";

  await connectDB(uri);

  const app = createApp();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});