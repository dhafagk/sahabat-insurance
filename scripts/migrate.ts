import { getPayload } from "payload";
import config from "../payload.config";

async function run() {
  console.log("Running Payload migrations...");
  const payload = await getPayload({ config });

  try {
    await payload.db.migrate();
    console.log("Migrations completed successfully.");
  } catch (err) {
    // If no pending migrations, Payload throws — treat that as success
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("no migrations")) {
      console.log("No pending migrations.");
    } else {
      throw err;
    }
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
