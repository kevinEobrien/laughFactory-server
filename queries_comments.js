const database = require("./database_connection");

module.exports = {
  list() {
    return database("comments").select();
  },
  read(id) {
    return database("comments")
      .where("id", id)
      .first();
  },
  create(laugh) {
    return database("comments")
      .insert(laugh)
      .returning("*")
      .then(record => record[0]);
  },
  update(id, laugh) {
    return database("comments")
      .update(laugh)
      .where("id", id)
      .returning("*")
      .then(record => record);
  },
  delete(id) {
    return database("comments")
      .where("id", id)
      .del();
  }
};
