var level = 1;
var exp = 0;
var maxHealth = 5;
var health = 5;
var damage = 1;

const itemSlots = new Map();
itemSlots.set("head", null);
itemSlots.set("torso", null);
itemSlots.set("right-hand", null);
itemSlots.set("left-hand", null);
itemSlots.set("legs", null);
itemSlots.set("right-foot", null);
itemSlots.set("left-foot", null);

loadMainMenu();

class Enemy {
    constructor(name, health, damage) {
        this.name = name;
        this.health = health;
        this.damage = damage;
    }
}

class Item {
    constructor(name, type, rarity, health, damage, spell, spritesheet) {
        this.name = name;
        this.type = type;
        this.rarity = rarity;
        this.health = health;
        this.damage = damage;
        this.spell = spell;
        this.spritesheet = spritesheet;
    }
}

function loadMainMenu() {
    main = document.getElementById("main")
    main.innerHTML = `
        <div id = "ui">
            <div id = "stats"></div >
            <div id="player">
                <img src="LazarusPlayer.png" alt="image of player character" />
                <div class="slot" id="head-slot">
                    <div id="head"></div>
                    <p>Head</p>
                </div>
                <div class="slot" id="torso-slot">
                    <p>Torso</p>
                    <div id="torso"></div>
                </div>
                <div class="slot" id="right-hand-slot">
                    <p>Right hand</p>
                    <div id="right-hand"></div>
                </div>
                <div class="slot" id="left-hand-slot">
                    <div id="left-hand"></div>
                    <p>Left hand</p>
                </div>
                <div class="slot" id="legs-slot">
                    <div id="legs"></div>
                    <p>Legs</p>
                </div>
                <div class="slot" id="right-foot-slot">
                    <p>Right foot</p>
                    <div id="Right foot"></div>
                </div>
                <div class="slot" id="left-foot-slot">
                    <div id="Left foot"></div>
                    <p>Left foot</p>
                </div>
            </div>
            <div id="items"></div>
        </div >
        <button id="start" type="button" onclick="loadGameScreen()">ENTER THE TOWER</button>
    `;
    loadStats()
}

function loadStats() {
    var stats = document.getElementById("stats");
    stats.innerHTML = `
        <h2><u>Stats</u></h2>
        <p>Level: ${level}</p>
        <p>Exp: ${exp}</p>
        <p>Health: ${maxHealth}</p>
        <p>Damage: ${damage}</p>
    `;
}

function loadItems() {

}

function loadGameScreen() {
    main = document.getElementById("main");
    main.innerHTML = `
        <h2>Hmmm... looks like the game isn't finished yet :P</h2>
        <button id="start" type="button" onclick="loadMainMenu()">GO BACK</button>
    `;
}