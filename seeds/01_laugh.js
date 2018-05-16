
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
          id:	3,
          name: "Brandon Johnson",
          description:	"Best Laugh Ever",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/BrandonLaugh.mp3",
          likes:	58
        },{
          id:	4,
          name:	"Kyle Coberly",
          description:	"Maniacal Cackle",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/KyleCoberly.mp3",
          likes:	25
        },{
          id:	5,
          name:	"Bjorn",
          description: "Gettin' tickled",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/BjornGettingTickled.mp3",
          likes:	22
        },{	
          id:	6,
          name:	"Bjorn",
          description:	"Laughing at a joke",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/BjornJokeLaugh.mp3",
          likes:	15
        },{
          id: 7,
          name:	"Quinn",
          description:	"LOUD Laugh",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/QuinnCuckooLaugh.mp3",
          likes:	11
        },{
          id:	8,
          name:	"Matt",
          description:	"No royalties required",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/Matt+from+hackathon.mp3",
          likes:	9
        },{
          id:	9,
          name:	"Jay",
          description:	"Ha",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/Jay.mp3",
          likes:	9
        },{
          id:	10,
          name:	"Raymond",
          description:	"His Laugh",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/RaymondLaugh.mp3",
          likes:	3
        },{
          id:	11,
          name:	"John",
          description: "Let It Fly",
          laughlink:	" https://s3.amazonaws.com/the-laugh-factory/LetItFlyJohn+.mp3",
          likes:	3
        },{
          id:	12,
          name:	"Ross",
          description:	"You're so angry...",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/RossSoAngry.mp3",
          likes:	3
        },{
          id:	13,
          name:	"Ben",
          description:	"I don't want to laugh at that.",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/DontWantToLaugh.mp3",
          likes:	2
        },{
          id:	14,
          name:	"Kj",
          description:	"Sweet laugh",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/KjLaugh.mp3",
          likes:	2
        },{
          id:	15,
          name:	"Sassy Sarah",
          description:	"Happy Hour",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/Sassy+Sara.mp3",
          likes:	2
        },{
          id:	16,
          name:	"Patrick",
          description:	"Biffle chortle",
          laughlink: "https://s3.amazonaws.com/the-laugh-factory/Patrick+Biffle.mp3",
          likes:	2
        },{
          id:	17,
          name:	"Auntie Amy",
          description:	"Huh huh huh... yeah...",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/huhHuhHuhYeah.mp3",
          likes:	1
        },{
          id:	18,
          name:	"B Long",
          description:	"Chuckle",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/BLongLaugh.mp3",
          likes:	1
        },{
          id:	19,
          name:	"Casey",
          description:	"Giggle",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/Casey.mp3",
          likes:	1
        },{
          id:	20,
          name:	"Yugi",
          description:	"Close enough",
          laughlink:	"https://s3.amazonaws.com/the-laugh-factory/Yugi.mp3",
          likes:	1
        } 
      ]);
    })
    .then (() => {
      return knex.raw("ALTER SEQUENCE laughs_id_seq RESTART WITH 21;");
    });
};

