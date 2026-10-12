module.exports = {
  apps: [
    {
      name: "roadstar-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p " + (process.env.PORT || 3005),
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
    },
  ],
};
