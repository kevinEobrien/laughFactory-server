
exports.up = function(knex, Promise) {
  return knex.schema.createTable("laughs", laughs => {
    laughs.increments();
    laughs.string("name");
    laughs.string("description");
    laughs.string("laughlink");
    laughs.integer("likes");
  });
};
  
exports.down = function(knex, Promise) {
  return    knex.schema.dropTableIfExists("laughs");
};