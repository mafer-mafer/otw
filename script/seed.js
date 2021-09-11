"use strict";

const {
  db,
  models: { User, Item, Group, Order },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const users = await Promise.all([
    User.create({ username: "irene", password: "123" }),
    User.create({ username: "wendy", password: "123" }),
    User.create({ username: "seulgi", password: "123" }),
  ]);

  const item1 = await Item.create({
    name: "RBB",
    type: "Album",
    damage: "none",
    preOrder: false,
  });

  const item2 = await Item.create({
    name: "Yeri The Red 2",
    type: "Photocard",
    damage: "light",
    preOrder: false,
  });

  const item3 = await Item.create({
    name: "Mandubong 2.0",
    type: "Lightstick",
    damage: "none",
    preOrder: true,
  });

  const item4 = await Item.create({
    name: "RedMare Tickets",
    type: "Concert",
    damage: "none",
    preOrder: true,
  });

  const order1 = await Order.create({
    seller: "@chaebom",
    platform: "Twitter",
    type: "Trade",
    dateOrdered: new Date(98, 1, 10),
    onHand: true,
    sellerLocation: "Albania",
    shippingType: "Stamped",
    shipped: "true",
    dateShipped: new Date(98, 1, 20),
    arrived: false,
  });

  const order2 = await Order.create({
    seller: "@producebyskg",
    platform: "Instagram",
    type: "Group Order",
    dateOrdered: new Date(10, 1, 10),
    onHand: false,
    sellerLocation: "Angola",
    shippingType: "Tracked",
    shipped: "false",
    arrived: false,
  });

  const order3 = await Order.create({
    seller: "@shonpremacy",
    platform: "eBay",
    type: "Purchase",
    dateOrdered: new Date(20, 1, 20),
    onHand: true,
    sellerLocation: "Algeria",
    shippingType: "Tracked",
    shipped: "false",
    arrived: false,
  });

  const girlGroups = await Promise.all([
    Group.create({ name: "2NE1", groupType: "Girl Group" }),
    Group.create({ name: "3YE", groupType: "Girl Group" }),
    Group.create({ name: "4Minute", groupType: "Girl Group" }),
    Group.create({ name: "Aespa", groupType: "Girl Group" }),
    Group.create({ name: "After School", groupType: "Girl Group" }),
    Group.create({ name: "Ailee", groupType: "Girl Group" }),
    Group.create({ name: "AleXa", groupType: "Girl Group" }),
    Group.create({ name: "Amber", groupType: "Girl Group" }),
    Group.create({ name: "AOA", groupType: "Girl Group" }),
    Group.create({ name: "Apink", groupType: "Girl Group" }),
    Group.create({ name: "April", groupType: "Girl Group" }),
    Group.create({ name: "Baek A Yeon", groupType: "Girl Group" }),
    Group.create({ name: "Baek Yerin", groupType: "Girl Group" }),
    Group.create({ name: "BIBI", groupType: "Girl Group" }),
    Group.create({ name: "Blackpink", groupType: "Girl Group" }),
    Group.create({ name: "Blackswan", groupType: "Girl Group" }),
    Group.create({ name: "BoA", groupType: "Girl Group" }),
    Group.create({ name: "Bolbbalgan4", groupType: "Girl Group" }),
    Group.create({ name: "Brave Girls", groupType: "Girl Group" }),
    Group.create({ name: "Brown Eyed Girls", groupType: "Girl Group" }),
    Group.create({ name: "Bvndit", groupType: "Girl Group" }),
    Group.create({ name: "Cherry Bullet", groupType: "Girl Group" }),
    Group.create({ name: "Chung Ha", groupType: "Girl Group" }),
    Group.create({ name: "Cignature", groupType: "Girl Group" }),
    Group.create({ name: "CL", groupType: "Girl Group" }),
    Group.create({ name: "CLC", groupType: "Girl Group" }),
    Group.create({ name: "Crayon Pop", groupType: "Girl Group" }),
    Group.create({ name: "Dal Shabet", groupType: "Girl Group" }),
    Group.create({ name: "DALsoobin", groupType: "Girl Group" }),
    Group.create({ name: "DIA", groupType: "Girl Group" }),
    Group.create({ name: "Dreamcatcher", groupType: "Girl Group" }),
    Group.create({ name: "DreamNote", groupType: "Girl Group" }),
    Group.create({ name: "Elkie", groupType: "Girl Group" }),
  ]);

  const boyGroups = await Promise.all([
    Group.create({ name: "2PM", groupType: "Boy Group" }),
    Group.create({ name: "AB6IX", groupType: "Boy Group" }),
    Group.create({ name: "Astro", groupType: "Boy Group" }),
    Group.create({ name: "Ateez", groupType: "Boy Group" }),
    Group.create({ name: "B.A.P.", groupType: "Boy Group" }),
    Group.create({ name: "Baekhyun", groupType: "Boy Group" }),
    Group.create({ name: "B.I", groupType: "Boy Group" }),
    Group.create({ name: "Big Bang", groupType: "Boy Group" }),
    Group.create({ name: "Block B", groupType: "Boy Group" }),
    Group.create({ name: "The Boyz", groupType: "Boy Group" }),
    Group.create({ name: "BtoB", groupType: "Boy Group" }),
    Group.create({ name: "BTS", groupType: "Boy Group" }),
    Group.create({ name: "CIX", groupType: "Boy Group" }),
  ]);

  await order1.addItem(item1);
  await order2.addItem(item2);
  await order3.addItem(item3);
  await order3.addItem(item4);

  await users[0].addOrder(order1);
  await users[0].addOrder(order2);
  await users[1].addOrder(order3);

  await users[0].addGroups([girlGroups[0], girlGroups[3], boyGroups[4]]);
  await users[1].addGroups([girlGroups[5], girlGroups[6], boyGroups[3]]);
  await users[2].addGroups([girlGroups[1], girlGroups[4], boyGroups[2]]);

  await item1.setGroup(boyGroups[1]);
  await item2.setGroup(girlGroups[8]);
  await item3.setGroup(girlGroups[2]);
  await item4.setGroup(girlGroups[1]);

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
