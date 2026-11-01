// Entry point: load .env, build the app, start listening.
import "dotenv/config";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT) || 5001;

createApp().listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
