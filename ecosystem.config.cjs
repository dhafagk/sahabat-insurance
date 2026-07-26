process.loadEnvFile();

module.exports = {
  apps: [
    {
      name: process.env.NAME,
      cwd: process.env.CWD,
      script: "npm",
      args: "start",
      max_memory_restart: process.env.MAX_MEMORY_RESTART || "1G",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
      },
    },
  ],
};
