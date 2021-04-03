require('dotenv').config()
const Pool=require("pg").Pool;

const devConfig={
    user:process.env.user,
    password: process.env.password,
    host:process.env.host,
    port:5432,
    database: process.env.database,
}

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool( process.env.NODE_ENV === "production" ? proConfig : devConfig,);

module.exports= pool;