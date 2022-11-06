var level = 1
var exp = 0
var expNeeded = 10

var baseMaxHealth = 5
var baseDamage = 1
var baseDodge = 0
var baseCrit = 0

var maxHealth 
var health
var damage
var dodge
var crit

var floor = 1
const MAX_FLOOR = 20

var equippedItems = new Map()
equippedItems.set("head", null)
equippedItems.set("torso", null)
equippedItems.set("right-hand", null)
equippedItems.set("left-hand", null)
equippedItems.set("legs", null)
equippedItems.set("right-foot", null)
equippedItems.set("left-foot", null)

function Enemy(name, health, damage, difficulty, expDrop, lootTable, sprite) {
    this.name = name
    this.health = health
    this.damage = damage
    this.difficulty = difficulty
    this.expDrop = expDrop
    this.lootTable = lootTable
    this.sprite = sprite
}

function Item(name, type, rarity, health, damage, dodge, crit, spritesheet) {
    this.name = name
    this.type = type
    this.rarity = rarity
    this.health = health
    this.damage = damage
    this.dodge = dodge
    this.crit = crit
    this.spritesheet = spritesheet
}

Item.prototype.getSpriteOffset = function () {
    switch (this.rarity) {
        case "common":
            return 0
            break
        case "uncommon":
            return 25
            break
        case "rare":
            return 50
            break
        case "mythical":
            return 75
            break
        case "godly":
            return 100
            break
        default:
            console.log(`WARNING: rarity for "${this.name}" is invalid.`)
    }
}

var itemPool = [];
var enemyPool = [];
var itemInventory = [];

fetch('https://afergel.github.io/items.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            itemPool[i] = Object.assign(new Item, data[i])
        }
        itemInventory = itemPool // DELETE WHEN DONE TESTING
        loadMainMenu()
        fetchEnemies()
    })

function fetchEnemies() {
    fetch('https://afergel.github.io/enemies.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                enemyPool[i] = Object.assign(new Enemy, data[i])
            }
            console.log(enemyPool)
        })
}

function displayItem(item) {
    var itemDisplay = document.getElementById("itemDisplay")

    itemDisplay.innerHTML = `
        <h2>${item.name}</h2>
        <div id="selectedItemSprite" style="background-image: url('${item.spritesheet}'); background-position: ${item.getSpriteOffset()}%"></div>
    `

    if (item.damage != 0) {
        itemDisplay.innerHTML += `<p>+${item.damage} damage</p>`
    }

    if (item.health != 0) {
        itemDisplay.innerHTML += `<p>+${item.health} health</p>`
    }

    if (item.crit != 0) {
        itemDisplay.innerHTML += `<p>+${item.crit}% crit</p>`
    }

    if (item.dodge != 0) {
        itemDisplay.innerHTML += `<p>+${item.dodge}% dodge</p>`
    }
}

function displayInventoryItem(index) {
    var item = itemInventory[index]
    displayItem(item)

    var itemDisplay = document.getElementById("itemDisplay")

    var equipMessage = "Equip"

    if (item.type == "handheld") {
        equipMessage += " right hand"
    }
    else if (item.type == "footwear") {
        equipMessage += " right foot"
    }

    itemDisplay.innerHTML += `<button onclick="equipItem(${index}, false)">${equipMessage}</button>`

    if (item.type == "handheld") {
        itemDisplay.innerHTML += `<button onclick="equipItem(${index}, true)">Equip left hand</button>`
    }
    else if (item.type == "footwear") {
        itemDisplay.innerHTML += `<button onclick="equipItem(${index}, true)">Equip left foot</button>`
    }

    itemDisplay.innerHTML += `<button onClick="discardItem(${index})">Discard</button>`
}

function displayEquippedItem(slotName) {
    var item = equippedItems.get(slotName)
    displayItem(item)

    var itemDisplay = document.getElementById("itemDisplay")
    itemDisplay.innerHTML += `<button onclick="unequipItem('${slotName}')">Unequip</button>`
}

function equipItem(index, isLeft) {

    var item = itemInventory[index]
    var slotName = ""

    switch (item.type) {
        case "headgear":
            slotName = "head"
            break
        case "handheld":
            if (isLeft) {
                slotName = "left-hand"
            }
            else {
                slotName = "right-hand"
            }
            break
        case "shirt":
            slotName = "torso"
            break
        case "pants":
            slotName = "legs"
            break
        case "footwear":
            if (isLeft) {
                slotName = "right-foot"
            }
            else {
                slotName = "left-foot"
            }
            break
        default:
            console.log(`WARNING: item "${item.name}" has an invalid type.`)
    }

    document.getElementById(slotName).style = `background-image: url('${item.spritesheet}'); background-position: ${item.getSpriteOffset()}%`

    if (equippedItems.get(slotName) != null) {
        itemInventory.push(equippedItems.get(slotName))
    }

    equippedItems.set(slotName, item)

    loadStats()
    discardItem(index)
}

function unequipItem(slotName) {
    itemInventory.push(Object.assign(new Item(), equippedItems.get(slotName)))
    loadItems()
    equippedItems.set(slotName, null)
    document.getElementById(slotName).style = ``
    document.getElementById("itemDisplay").innerHTML = ``
    loadStats()
}

function discardItem(index) {
    itemInventory.splice(index, 1)
    loadItems()
    document.getElementById("itemDisplay").innerHTML = ``
}

function loadMainMenu() {
    main = document.getElementById("main")
    main.innerHTML = `
        <div id = "ui">
            <div id = "stats"></div >
            <div id="player">
                <img src="images/Player.png" alt="image of player character" />
                <div class="slot" id="head-slot">
                    <div id="head" onClick="displayEquippedItem('head')"></div>
                    <p>Head</p>
                </div>
                <div class="slot" id="torso-slot">
                    <p>Torso</p>
                    <div id="torso" onClick="displayEquippedItem('torso')"></div>
                </div>
                <div class="slot" id="right-hand-slot">
                    <p>Right hand</p>
                    <div id="right-hand" onClick="displayEquippedItem('right-hand')"></div>
                </div>
                <div class="slot" id="left-hand-slot">
                    <div id="left-hand" onClick="displayEquippedItem('left-hand')"></div>
                    <p>Left hand</p>
                </div>
                <div class="slot" id="legs-slot">
                    <div id="legs" onClick="displayEquippedItem('legs')"></div>
                    <p>Legs</p>
                </div>
                <div class="slot" id="right-foot-slot">
                    <p>Right foot</p>
                    <div id="right-foot" onClick="displayEquippedItem('right-foot')"></div>
                </div>
                <div class="slot" id="left-foot-slot">
                    <div id="left-foot" onClick="displayEquippedItem('left-foot')"></div>
                    <p>Left foot</p>
                </div>
            </div>
            <div id="items"></div>
            <div id="itemDisplay"></div>
        </div >
        <button id="start" type="button" onclick="loadGameScreen()">ENTER THE TOWER</button>
    `
    loadStats()
    loadItems()

    equippedItems.forEach((value, key) => {
        if (value != null) {
            var item = Object.assign(new Item(), value)
            document.getElementById(key).style = `background-image: url('${item.spritesheet}'); background-position: ${item.getSpriteOffset()}%`
        }
    })
}

function loadStats() {

    maxHealth = baseMaxHealth
    damage = baseDamage
    crit = baseCrit
    dodge = baseDodge

    equippedItems.forEach((value) => {
        if (value != null) {
            maxHealth += value.health
            damage += value.damage
            crit += value.crit
            dodge += value.dodge
        }
    })

    var stats = document.getElementById("stats")
    stats.innerHTML = `
        <h2><u>Stats</u></h2>
        <p><b>Level:</b> ${level}</p>
        <p><b>Exp:</b> ${exp}/${expNeeded}</p>
        <p><b>Health:</b> ${maxHealth}</p>
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

        for (let i = 0; i < itemInventory.length; i++) {
            var offset = itemInventory[i].getSpriteOffset()
            itemGrid.innerHTML += `<div class="invItem" onclick="displayInventoryItem(${i})" style="background-image: url('${itemInventory[i].spritesheet}'); background-position: ${offset}%"></div>`
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