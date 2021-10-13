"use strict";

const {
  db,
  models: { User, Item, Group, Order },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      username: "irene",
      password: "123",
      email: "baechu@gmail.com",
    }),
    User.create({
      username: "wendy",
      password: "123",
      email: "hamster@rv.com",
    }),
    User.create({ username: "seulgi", password: "123", email: "slug@ksg.com" }),
  ]);

  const item1 = await Item.create({
    name: "RBB",
    type: "Album",
    damage: "none",
    preOrder: false,
    groupName: "Red Velvet",
  });

  const item2 = await Item.create({
    name: "Yeri The Red 2",
    type: "Photocard",
    damage: "light",
    preOrder: false,
    groupName: "AOA",
  });

  const item3 = await Item.create({
    name: "Mandubong 2.0",
    type: "Lightstick",
    damage: "none",
    preOrder: true,
    groupName: "BoA",
    releaseDate: new Date(21, 7, 14),
  });

  const item4 = await Item.create({
    name: "RedMare Tickets",
    type: "Concert",
    damage: "none",
    preOrder: true,
    groupName: "Loona",
  });

  const order1 = await Order.create({
    seller: "@chaebom",
    platform: "Twitter",
    type: "Trade",
    status: "Shipped",
    dateOrdered: new Date(98, 1, 10),
    sellerLocation: "Albania",
    shippingType: "Stamped",
    dateShipped: new Date(98, 1, 20),
    note: "Nice!",
  });

  const order2 = await Order.create({
    seller: "@producebyskg",
    platform: "Instagram",
    status: "Waiting for Seller to Receive",
    type: "Group Order",
    dateOrdered: new Date(10, 1, 10),
    sellerLocation: "Angola",
    shippingType: "Tracked",
  });

  const order3 = await Order.create({
    seller: "@shonpremacy",
    platform: "eBay",
    type: "Purchase",
    status: "Waiting for Shipment",
    dateOrdered: new Date(20, 1, 20),
    sellerLocation: "Algeria",
    shippingType: "Tracked",
    note: "Is coming in lateeee",
  });

  const order4 = await Order.create({
    seller: "@sarah",
    platform: "eBay",
    type: "Group Order",
    status: "Waiting for Shipment",
    dateOrdered: new Date(20, 1, 20),
    sellerLocation: "Algeria",
    shippingType: "Tracked",
    note: "Is coming in lateeee",
  });

  const order5 = await Order.create({
    seller: "@james",
    platform: "eBay",
    type: "Trade",
    status: "Waiting for Shipment",
    dateOrdered: new Date(20, 1, 20),
    sellerLocation: "Algeria",
    shippingType: "Tracked",
    note: "Is coming in lateeee",
  });

  const girlGroups = await Promise.all(
    GirlGroups.map((group) => {
      return Group.create({
        name: group,
        groupType: "g",
      });
    })
  );

  const boyGroups = await Promise.all(
    BoyGroups.map((group) => {
      return Group.create({
        name: group,
        groupType: "b",
      });
    })
  );

  await order1.addItem(item1);
  await order2.addItem(item2);
  await order3.addItem(item3);
  await order3.addItem(item4);

  await users[0].addOrder(order1);
  await users[0].addOrder(order2);
  await users[0].addOrder(order4);
  await users[0].addOrder(order5);

  await users[1].addOrder(order3);

  await users[0].addGroups([girlGroups[0], girlGroups[3]]);
  await users[1].addGroups([girlGroups[5], girlGroups[6], boyGroups[21]]);
  await users[2].addGroups([girlGroups[1], girlGroups[4], boyGroups[30]]);

  await item1.setGroup(boyGroups[30]);
  await item2.setGroup(girlGroups[8]);
  await item3.setGroup(girlGroups[2]);
  await item4.setGroup(girlGroups[1]);

  console.log(`seeded successfully`);
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
  "Enhypen",
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
