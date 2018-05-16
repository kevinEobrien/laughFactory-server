
module.exports = {

  development: {
    client: "pg",
    connection: "postgres:///laughfactory" 
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};