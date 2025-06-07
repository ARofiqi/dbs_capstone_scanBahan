module.exports = {
  apps: [{
    name: 'hapi-production',
    script: 'app.js',
    env: {
      NODE_ENV: 'production'
    },
    error_file: "/home/ec2-user/logs/hapi-error.log",  
    out_file: "/home/ec2-user/logs/hapi-out.log"       
  }]
};