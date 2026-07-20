process.loadEnvFile();

module.exports = {
  apps: [
    {
      name: process.env.NAME,
      cwd: process.env.CWD,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
      },
    },
  ],
};
