/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(createdAt, name, dimensions) {
  this.createdAt = createdAt;
  this.name = name;
  this.dimensions = dimensions;
}

GameObject.prototype.destroy = function() {
  this.healthPoints = 0;
  return `${this.name} was removed from the game.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(createdAt, name, dimensions, healthPoints) {
  GameObject.call(this, createdAt, name, dimensions);

  this.healthPoints = healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(points) {
  if (this.healthPoints <= 0)
    return `${this.name} has been destroyed`;

  this.healthPoints -= points;
  return `${this.name} took damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(humanObj) {
  CharacterStats.call(
    this,
    humanObj.createdAt,
    humanObj.name,
    humanObj.dimensions,
    humanObj.healthPoints
  );

  this.team = humanObj.team;
  this.weapons = humanObj.weapons;
  this.language = humanObj.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers greetings in ${this.language}`;
};

Humanoid.prototype.logPoint = function() {
  return this.healthPoints ? `${this.name} has a health point of ${this.healthPoints}` : `${this.name} is destroyed`;
}

Humanoid.prototype.bluff = function() {
  return `HAHAHAHAHAAHHAAHAAAA!!!!! I am ${this.name}, I will kill you with my ${this.weapons[0]}`
}

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Hero(heroAttribute) {
  Humanoid.call(this, heroAttribute);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.attack = function(victim) {
  victim.takeDamage(5);
  return `${this.name} attacked ${victim.name}!!! Damage inflicted`;
};

Hero.prototype.annihilate = function(victim) {
  victim.destroy();
  return `${this.name} just annihilated ${victim.name}!`;
};

function Villain(villainAttribute) {
  Humanoid.call(this, villainAttribute);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.commitEvil = function(victim) {
  victim.takeDamage(5);
  return `Watchout ${victim.name}, ${this.name} is up to no good. Damage inflicted on ${victim.name}`;
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

const batman = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 3,
    height: 4
  },
  healthPoints: 30,
  name: "Batman",
  team: "Justice League",
  weapons: ["Batarang", "Grappling Gun"],
  language: "English"
});

const joker = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 3
  },
  healthPoints: 30,
  name: "The Joker",
  team: "Fiendish Villains",
  weapons: ["Joker venoms", "Knives"],
  language: "English"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Batman and joker fight begins here
console.log('\nBatman faces off against The Joker.\n')
console.log(batman.bluff());
console.log(joker.bluff());
console.log(batman.logPoint());
console.log(joker.logPoint());
console.log(batman.attack(joker));
console.log(joker.logPoint());
console.log(joker.commitEvil(batman));
console.log(batman.logPoint());
console.log(batman.attack(joker));
console.log(joker.logPoint());
console.log(joker.commitEvil(batman));
console.log(batman.logPoint());
console.log(batman.annihilate(joker));
console.log(joker.logPoint());
