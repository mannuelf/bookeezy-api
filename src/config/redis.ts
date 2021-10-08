export default {
  flag: true,
  secret: process.env.REDIS_SECRET,
  database: process.env.REDIS_DB,
  endpoint: process.env.REDIS_CLUSTER,
  custom_port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};
