var level = 1
var exp = 0
var expNeeded = 10
var maxHealth = 5
var health = 5
var damage = 1
var dodge = 0
var crit = 0

const itemSlots = new Map()
itemSlots.set("head", null)
itemSlots.set("torso", null)
itemSlots.set("right-hand", null)
itemSlots.set("left-hand", null)
itemSlots.set("legs", null)
itemSlots.set("right-foot", null)
itemSlots.set("left-foot", null)

function Enemy(name, health, damage) {
    this.name = name
    this.health = health
    this.damage = damage
}

function Item(name, type, rarity, health, damage, dodge, crit, spell, spritesheet) {
    this.name = name
    this.type = type
    this.rarity = rarity
    this.health = health
    this.damage = damage
    this.dodge = dodge
    this.crit = crit
    this.spell = spell
    this.spritesheet = spritesheet
}

var itemPool = [];

fetch('https://afergel.github.io/items.json')
    .then(response => response.json())
    .then(data => {
        itemPool = data
        itemInventory = itemPool
        loadMainMenu()
    })

var itemInventory = itemPool;

function loadMainMenu() {
    main = document.getElementById("main")
    main.innerHTML = `
        <div id = "ui">
            <div id = "stats"></div >
            <div id="player">
                <img src="images/Player.png" alt="image of player character" />
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
    `
    loadStats()
    loadItems()
}

function loadStats() {
    var stats = document.getElementById("stats")
    stats.innerHTML = `
        <h2><u>Stats</u></h2>
        <p><b>Level:</b> ${level}</p>
        <p><b>Exp:</b> ${exp}/${expNeeded}</p>
        <p><b>Health:</b> ${health}</p>
        <p><b>Damage:</b> ${damage}</p>
        <p><b>Crit:</b> ${crit}%</p>
        <p><b>Dodge:</b> ${dodge}%</p>

    `
}

function loadItems() {
    var items = document.getElementById("items")
    items.innerHTML = '<h2><u>Items</u></h2>'
    if (itemInventory.length == 0) {
        items.innerHTML += '<p>Looks like you don\'t have any items... venture into the tower to find some!</p>'
    }
    else {
        items.innerHTML += '<div id="itemGrid"></div>'
        var itemGrid = document.getElementById("itemGrid")
        for (const item of itemInventory) {

            var offset
            switch (item.rarity) {
                case "common":
                    offset = 0
                    break
                case "uncommon":
                    offset = 25
                    break
                case "rare":
                    offset = 50
                    break
                case "mythical":
                    offset = 75
                    break
                case "godly":
                    offset = 100
                    break
                default:
                    offset = 0;
                    console.log(`ERROR: rarity for ${item} is invalid`)
            }

            itemGrid.innerHTML += `<div class="invItem" style="background-image: url('${item.spritesheet}'); background-position: ${offset}%"></div>`
        }
    }
}

function loadGameScreen() {
    main = document.getElementById("main")
    main.innerHTML = `
        <h2>Hmmm... looks like the game isn't finished yet :P</h2>
        <button id="start" type="button" onclick="loadMainMenu()">GO BACK</button>
    `
}