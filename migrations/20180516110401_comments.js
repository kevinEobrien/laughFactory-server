
exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", comments =>{
    comments.increments();
    comments.string("Commenter");
    comments.string("topic");
    comments.string("comment");
  });
};
  
exports.down = function(knex, Promise) {
  return    knex.schema.dropTableIfExists("comments");
};
  
