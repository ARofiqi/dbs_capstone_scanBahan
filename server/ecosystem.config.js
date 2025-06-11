module.exports = {
  apps: [
    {
      name: "scanbahan",
      script: "index.js",
      instances: 1,
      autorestart: true,
      max_memory_restart: "800M",
      env: {
        NODE_ENV: "production",
      },
      error_file: "/home/ubuntu/logs/scanbahan-error.log",
      out_file: "/home/ubuntu/logs/scanbahan-out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
