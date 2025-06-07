module.exports = {
  apps: [{
    name: 'scanbahan',
    script: 'index.js',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/hapi-error.log',
    out_file: '/var/log/hapi-out.log'
  }]
};