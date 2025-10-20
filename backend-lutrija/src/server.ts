import app from "./app";
import { initDb } from "./db";

const PORT = process.env.PORT || 3000;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})();
