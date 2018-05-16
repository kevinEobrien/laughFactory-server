const database = require("./database_connection");

module.exports = {
  list(){
    return database("laughs").select().orderBy("likes", "desc");
  },
  read(id){
    return database("laughs")
      .where("id",id)
      .first();
  },
  create(laugh){
    return database("laughs")
      .insert(laugh)
      .returning("*")
      .then(record=> record[0]);

  },
  update(id, currentLikes){
    return database("laughs")
      .where("id",id)
      .returning("*")  
      .update({"likes": (currentLikes+1)})
      .then(record=> record);
  },
  delete(id){
    return database("laughs")
      .where("id", id) 
      .del();
  }
};