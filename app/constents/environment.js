require('dotenv').config();
module.exports.env= {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DIALECT: process.env.DIALECT,
    AWS_ACCESS: process.env.AWS_ACCESS,
    AWS_SECRET: process.env.AWS_SECRET
}