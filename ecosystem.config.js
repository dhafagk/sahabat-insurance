process.loadEnvFile()

module.exports = {
  apps: [
    {
      name: "sahabat-insurance",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
      },
    },
  ],
};
