const configuration = {
    port: process.env.PORT || 3000,
    database: process.env.MONGODB_URL ||'mongodb://127.0.0.1:27017/result_management_system',
};

module.exports = configuration;