
exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE laughs CASCADE")
    .then(function () {
      return knex("laughs").insert([
        {
          id: 1,
          name: "Kevin",
          description: "Silly laugh",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/sillyLaugh.mp3",
          likes: 0
        },
        {
          id: 2,
          name: "Goofball",
          description:"Mockery",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/Haha.mp3",
          likes: 0
        },
        {
          id: 3,
          name: "Brandon Johnson",
          description: "Best Laugh Ever",
          laughlink:"https://s3.amazonaws.com/the-laugh-factory/BrandonLaugh.mp3",
          likes: 202
        }
      ]);
    })
    .then (() => {
      return knex.raw("ALTER SEQUENCE laughs_id_seq RESTART WITH 4;");
    });
};

