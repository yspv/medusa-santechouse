module.exports = {
  apps: [
    {
      name: "medusa-server",
      script: "npx",
      args: "medusa start",
      cwd: ".medusa/server",
      watch: false,
      env: {
        WORKER_MODE: "server",
        PORT: 9000,
      },
    },
    {
      name: "medusa-worker",
      script: "npx",
      args: "medusa start",
      cwd: ".medusa/server",
      watch: false,
      env: {
        WORKER_MODE: "worker",
        ADMIN_DISABLED: "true",
        PORT: 9001,
      },
    },
  ],
};
