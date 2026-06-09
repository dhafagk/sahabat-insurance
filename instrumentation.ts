export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { getPayload } = await import("payload");
  const { default: config } = await import("./payload.config");

  const payload = await getPayload({ config });

  try {
    await payload.db.migrate();
    payload.logger.info("Database migrations applied.");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("no migrations")) {
      payload.logger.info("No pending migrations.");
    } else {
      payload.logger.error(
        { err },
        "Migration failed — aborting server start.",
      );
      process.exit(1);
    }
  }
}
