"use strict";

const {
  db,
  models: { User },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

const GirlGroups = [
  "2NE1",
  "3YE",
  "4Minute",
  "Aespa",
  "After School",
  "Ailee",
  "AleXa",
  "Amber",
  "AOA",
  "Apink",
  "April",
  "Baek A Yeon",
  "Baek Yerin",
  "BIBI",
  "Blackpink",
  "Blackswan",
  "BoA",
  "Bolbbalgan4",
  "Brave Girls",
  "Brown Eyed Girls",
  "Bvndit",
  "Cherry Bullet",
  "Chung Ha",
  "Cignature",
  "CL",
  "CLC",
  "Crayon Pop",
  "Dal Shabet",
  "DALsoobin",
  "DIA",
  "Dreamcatcher",
  "DreamNote",
  "Elkie",
  "Elris",
  "Everglow",
  "EXID",
  "F(x)",
  "Fanatics",
  "Fromis 9",
  "GFriend",
  "(G)I-dle",
  "Girls' Generation",
  "Gugudan",
  "GWSN",
  "HA:TFELT",
  "Heize",
  "Hello Venus",
  "Hot Issue",
  "Hyoyeon",
  "HyunA",
  "I.O.I",
  "Itzy",
  "IU",
  "Iz*One",
  "Jennie",
  "Jessi",
  "Joy",
  "Kara",
  "Kwon Eun Bi",
  "Laboum",
  "Ladies' Code",
  "Lee Hi",
  "Lightsum",
  "Lisa",
  "Loona",
  "Lovelyz",
  "Luna",
  "Lunarsolar",
  "Mamamoo",
  "Miss A",
  "Momoland",
  "Nature",
  "Natty",
  "NeonPunch",
  "Nine Muses",
  "Oh My Girl",
  "Oh!GG",
  "Orange Caramel",
  "Pristin",
  "Purple Kiss",
  "Purplebeck",
  "Red Velvet",
  "Rocket Punch",
  "S.E.S.",
  "Saturday",
  "Secret Number",
  "Sistar",
  "Sonamoo",
  "STAYC",
  "Stellar",
  "T-ara",
  "Tri.be",
  "Twice",
  "Weeekly",
  "Weki Meki",
  "Wendy",
  "WJSN",
  "Wonder Girls",
  "Woo!ah!",
];

const BoyGroups = [
  "2PM",
  "AB6IX",
  "Astro",
  "Ateez",
  "B.A.P.",
  "Baekhyun",
  "B.I",
  "Big Bang",
  "Block B",
  "The Boyz",
  "BtoB",
  "BTS",
  "CIX",
  "Cravity",
  "DAWN",
  "DEAN",
  "Enhyper",
  "Exo",
  "G-Dragon",
  "Got7",
  "H.O.T.",
  "IKon",
  "Infinite",
  "KNK",
  "Monsta X",
  "N.Flying",
  "NCT",
  "NU'EST",
  "Oneus",
  "ONF",
  "OnlyOneOf",
  "Pentagon",
  "The Rose",
  "SF9",
  "Shinee",
  "Stray Kids",
  "Suga",
  "Super Junior",
  "SuperM",
  "Taemin",
  "TXT",
  "Treasure",
  "TVXQ",
  "Victon",
  "VIXX",
  "Wanna One",
  "WayV",
  "Winner",
];
