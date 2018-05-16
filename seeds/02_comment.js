
exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE TABLE comments RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("comments").insert([
        {Commenter: "Kevin",
          topic: "Brandon Johnson",
          comment: "That really is the best laugh ever."}
      ]);
    });
};
