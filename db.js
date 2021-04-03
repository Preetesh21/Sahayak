require('dotenv').config()
const Pool=require("pg").Pool;

const devConfig={
    user:process.env.pg_user,
    password: process.env.pg_password,
    host:process.env.pg_host,
    port:process.env.PG_PORT,
    database: process.env.pg_database,
}

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool( process.env.NODE_ENV === "production" ? proConfig : devConfig,);

module.exports= pool;