
module.exports = {

  development: {
    client: "pg",
    connection: "postgres:///laughfactory" 
  },
  production: {
    client: "postgresql",
    connection: process.env.NODE_ENV
  }
};