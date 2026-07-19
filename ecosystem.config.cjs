process.loadEnvFile();

module.exports = {
  apps: [
    {
      name: process.env.NAME,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
      },
    },
  ],
};
