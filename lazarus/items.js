var itemPoolString = `[
  {
    "name": "Plastic knife",
    "type": "handheld",
    "rarity": "common",
    "health": 0,
    "damage": 1,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/PlasticKnife.png"
  },
  {
    "name": "Blood knife",
    "type": "handheld",
    "rarity": "rare",
    "health": 0,
    "damage": 3,
    "dodge": 0,
    "crit": 10,
    "sprite": "images/items/BloodKnife.png"
  },
  {
    "name": "Cornea shield",
    "type": "handheld",
    "rarity": "uncommon",
    "health": 6,
    "damage": 0,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/CorneaShield.png"
  },
  {
    "name": "Poison spike",
    "type": "handheld",
    "rarity": "mythical",
    "health": 0,
    "damage": 1,
    "dodge": 0,
    "crit": 30,
    "sprite": "images/items/PoisonSpike.png"
  },
  {
    "name": "Insect leg",
    "type": "handheld",
    "rarity": "common",
    "health": 0,
    "damage": 4,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/InsectLeg.png"
  },
  {
    "name": "Beginner's wand",
    "type": "handheld",
    "rarity": "common",
    "health": 0,
    "damage": 2,
    "dodge": 5,
    "crit": 5,
    "sprite": "images/items/BeginnersWand.png"
  },
  {
    "name": "Deflector wand",
    "type": "handheld",
    "rarity": "mythical",
    "health": 20,
    "damage": 0,
    "dodge": 5,
    "crit": 0,
    "sprite": "images/items/DeflectorWand.png"
  },
  {
    "name": "Nature's Protector",
    "type": "handheld",
    "rarity": "godly",
    "health": 80,
    "damage": 0,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/NaturesProtector.png"
  },
  {
    "name": "Vine whip",
    "type": "handheld",
    "rarity": "common",
    "health": 0,
    "damage": 7,
    "dodge": 0,
    "crit": 10,
    "sprite": "images/items/VineWhip.png"
  },
  {
    "name": "Spirit scimitar",
    "type": "handheld",
    "rarity": "mythical",
    "health": 0,
    "damage": 15,
    "dodge": 5,
    "crit": 10,
    "sprite": "images/items/SpiritScimitar.png"
  },
  {
    "name": "Wayfinder's Candle",
    "type": "handheld",
    "rarity": "mythical",
    "health": 0,
    "damage": 0,
    "dodge": 10,
    "crit": 75,
    "sprite": "images/items/WayfindersCandle.png"
  },
  {
    "name": "Blade of Jeremy",
    "type": "handheld",
    "rarity": "godly",
    "health": 0,
    "damage": 200,
    "dodge": 0,
    "crit": 50,
    "sprite": "images/items/BladeOfJeremy.png"
  },
  {
    "name": "Plastic helmet",
    "type": "headgear",
    "rarity": "common",
    "health": 1,
    "damage": 0,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/PlasticHelmet.png"
  },
  {
    "name": "Shroom cap",
    "type": "headgear",
    "rarity": "rare",
    "health": 0,
    "damage": 0,
    "dodge": 10,
    "crit": 0,
    "sprite": "images/items/ShroomCap.png"
  },
  {
    "name": "Antennae",
    "type": "headgear",
    "rarity": "common",
    "health": 2,
    "damage": 0,
    "dodge": 10,
    "crit": 10,
    "sprite": "images/items/Antennae.png"
  },
  {
    "name": "Bug eyes",
    "type": "headgear",
    "rarity": "rare",
    "health": 0,
    "damage": 0,
    "dodge": 15,
    "crit": 15,
    "sprite": "images/items/BugEyes.png"
  },
  {
    "name": "Third eye",
    "type": "headgear",
    "rarity": "godly",
    "health": 0,
    "damage": 0,
    "dodge": 0,
    "crit": 100,
    "sprite": "images/items/ThirdEye.png"
  },
  {
    "name": "Stone mask",
    "type": "headgear",
    "rarity": "uncommon",
    "health": 25,
    "damage": 2,
    "dodge": 0,
    "crit": 0,
    "sprite": "images/items/StoneMask.png"
  },
  {
    "name": "Horseless head",
    "type": "headgear",
    "rarity": "mythical",
    "health": 5,
    "damage": 10,
    "dodge": 5,
    "crit": 10,
    "sprite": "images/items/HorselessHead.png"
  },
  {
    "name": "Bucket helmet",
    "type": "headgear",
    "rarity": "common",
    "health": 40,
    "damage": 0,
    "dodge": 0,
    "crit": 5,
    "sprite": "images/items/BucketHelmet.png"
  },
  {
    "name": "Second head",
    "type": "headgear",
    "rarity": "mythical",
    "health": 100,
    "damage": 40,
    "dodge": 0,
    "crit": 20,
    "sprite": "images/items/SecondHead.png"
  },
  {
    "name": "Butterfly wings",
    "type": "shirt",
    "rarity": "uncommon",
    "health": 3,
    "damage": 0,
    "dodge": 20,
    "crit": 0,
    "sprite": "images/items/ButterflyWings.png"
  },
  {
    "name": "Angel wings",
    "type": "shirt",
    "rarity": "godly",
    "health": 15,
    "damage": 3,
    "dodge": 25,
    "crit": 15,
    "sprite": "images/items/AngelWings.png"
  },
  {
    "name": "Evil cape",
    "type": "shirt",
    "rarity": "common",
    "health": 5,
    "damage": 5,
    "dodge": 10,
    "crit": 10,
    "sprite": "images/items/EvilCape.png"
  },
  {
    "name": "Bat wings",
    "type": "shirt",
    "rarity": "uncommon",
    "health": 10,
    "damage": 10,
    "dodge": 15,
    "crit": 0,
    "sprite": "images/items/BatWings.png"
  },
  {
    "name": "Cool t-shirt",
    "type": "shirt",
    "rarity": "uncommon",
    "health": 20,
    "damage": 20,
    "dodge": 10,
    "crit": 20,
    "sprite": "images/items/CoolTShirt.png"
  },
  {
    "name": "Kilt",
    "type": "pants",
    "rarity": "uncommon",
    "health": 1,
    "damage": 0,
    "dodge": 5,
    "crit": 0,
    "sprite": "images/items/Kilt.png"
  },
  {
    "name": "Magic jeans",
    "type": "pants",
    "rarity": "rare",
    "health": 2,
    "damage": 0,
    "dodge": 10,
    "crit": 10,
    "sprite": "images/items/MagicJeans.png"
  },
  {
    "name": "Gardener pants",
    "type": "pants",
    "rarity": "common",
    "health": 15,
    "damage": 0,
    "dodge": 5,
    "crit": 0,
    "sprite": "images/items/GardenerPants.png"
  },
  {
    "name": "Tentacle legs",
    "type": "pants",
    "rarity": "common",
    "health": 30,
    "damage": 4,
    "dodge": 5,
    "crit": 0,
    "sprite": "images/items/TentacleLegs.png"
  },
  {
    "name": "Muddy shoe",
    "type": "footwear",
    "rarity": "common",
    "health": 0,
    "damage": 0,
    "crit": 0,
    "dodge": 10,
    "sprite": "images/items/MuddyShoe.png"
  },
  {
    "name": "Slimy boot",
    "type": "footwear",
    "rarity": "uncommon",
    "health": 3,
    "damage": 0,
    "crit": 0,
    "dodge": 10,
    "sprite": "images/items/SlimyBoot.png"
  },
  {
    "name": "Iron stomper",
    "type": "footwear",
    "rarity": "godly",
    "health": 20,
    "damage": 30,
    "crit": 0,
    "dodge": 0,
    "sprite": "iamges/items/IronStomper.png"
  }
]`;