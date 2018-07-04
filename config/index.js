let config;

if (process.env.app_code){
    const {app_id, app_code} = process.env; 
    config = {app_id, app_code};
}

else {
    config = require('./config.js');
}

module.exports = config; 