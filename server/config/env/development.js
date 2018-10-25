module.exports = {
  port: process.env.PORT,
  api_url: process.env.API_URL,
  hook_url: process.env.HOOK_URL,
  authen: {
    secret: process.env.AUTHEN_SECRET,
    token_expires_in: 15 * 60 * 1000
  },
  do_space: {
    bucket_name: process.env.DO_BUCKET_NAME,
    access_key: process.env.DO_ACCESS_KEY,
    secret: process.env.DO_SECRET
  },
  mysql: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_CONNECTION_STRING,
    dialect: 'mysql',
    dialectOptions: { charset: 'utf8mb4', decimalNumbers: true },
    define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' },
    pool: {
      min: process.env.MYSQL_POOL_MIN,
      max: process.env.MYSQL_POOL_MAX,
      acquire: process.env.MYSQL_POOL_ACQUIRE
    },
    debug: process.env.MYSQL_DEBUG
  },
}