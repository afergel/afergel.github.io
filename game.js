var level = 1
var exp = 0
var expNeeded = 10

var inventoryPage = 1

// Player's base stats before equipment modifiers
var baseMaxHealth = 5
var baseDamage = 1
var baseDodge = 0
var baseCrit = 0

// Player's stats after equipment modifiers
var maxHealth 
var health
var damage
var dodge
var crit

// Current floor (i.e. level) the player is on in the game
var floor
const MAX_FLOOR = 20

var currentEnemy
var enemyMaxHealth
var enemyDrops = []

// Chance to drop for different item rarities
var dropRarities = new Map()
dropRarities.set("common", 0.5)
dropRarities.set("uncommon", 0.2)
dropRarities.set("rare", 0.05)
dropRarities.set("mythical", 0.01)
dropRarities.set("godly", 0.001)

// Keeps track of what item is equipped in each equipment slot
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

function Item(name, type, rarity, health, damage, dodge, crit, sprite) {
    this.name = name
    this.type = type
    this.rarity = rarity
    this.health = health
    this.damage = damage
    this.dodge = dodge
    this.crit = crit
    this.sprite = sprite
}

var itemPool = []; // List of all available items
var enemyPool = []; // List of all available enemies
var itemInventory = []; // List of items the player has, but hasn't equipped

fetch('https://afergel.github.io/items.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            itemPool[i] = Object.assign(new Item, data[i])
        }
        fetchEnemies()
        loadMainMenu()
    })

function fetchEnemies() {
    fetch('https://afergel.github.io/enemies.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                enemyPool[i] = Object.assign(new Enemy, data[i])
            }
        })
}

// Displays basic item information on the right side of the "Items" menu
function displayItem(item) {
    var itemDisplay = document.getElementById("itemDisplay")

    itemDisplay.innerHTML = `
        <h2>${item.name}</h2>
        <h3 class="${item.rarity}">${item.rarity[0].toUpperCase() + item.rarity.substring(1)}</h3>
        <div id="selectedItemSprite" style="background-image: url('${item.sprite}')"></div>
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

// Displays buttons to equip or discard an item in the player's inventory
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

// Displays button to unequip an item that's already equipped
function displayEquippedItem(slotName) {
    var item = equippedItems.get(slotName)
    displayItem(item)

    var itemDisplay = document.getElementById("itemDisplay")
    itemDisplay.innerHTML += `<button onclick="unequipItem('${slotName}')">Unequip</button>`
}

// Moves an item from the player's inventory to an equipment slot and updates the player's stats accordingly.
// If an item is already in the slot, that item is moved back to the player's inventory
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
                slotName = "left-foot"
            }
            else {
                slotName = "right-foot"
            }
            break
        default:
            console.log(`WARNING: item "${item.name}" has an invalid type.`)
    }

    document.getElementById(slotName).style = `background-image: url('${item.sprite}')`

    if (equippedItems.get(slotName) != null) {
        itemInventory.push(equippedItems.get(slotName))
    }

    equippedItems.set(slotName, item)

    loadStats()
    discardItem(index)
}

// Moves an item from an equipment slot back to the player's inventory and updates the player's stats accordingly
function unequipItem(slotName) {
    itemInventory.push(Object.assign(new Item(), equippedItems.get(slotName)))
    loadItems(inventoryPage)
    equippedItems.set(slotName, null)
    document.getElementById(slotName).style = ``
    document.getElementById("itemDisplay").innerHTML = ``
    loadStats()
}

// Deletes an item from the player's inventory
function discardItem(index) {
    itemInventory.splice(index, 1)
    loadItems(inventoryPage)
    document.getElementById("itemDisplay").innerHTML = ``
}

// The menu the player sees when first loading the page
// Shows player stats, equipped items, item inventory, and a button to start a game ("enter the tower")
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
    loadItems(1)

    equippedItems.forEach((value, key) => {
        if (value != null) {
            var item = Object.assign(new Item(), value)
            document.getElementById(key).style = `background-image: url('${item.sprite}')`
        }
    })
}

// Calculates and display the player's stats after item modifiers are applied
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

    health = maxHealth

    if (crit > 100) {
        crit = 100
    }
    if (dodge > 100) {
        dodge = 100
    }

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

// Display the user's inventory as a grid of items
// Inventory is separated into pages that the player can click through with arrow buttons
function loadItems(page) {
    inventoryPage = page

    var items = document.getElementById("items")
    items.innerHTML = '<h2><u>Items</u></h2>'
    if (itemInventory.length == 0) {
        items.innerHTML += '<p>Looks like you don\'t have any items... venture into the tower to find some!</p>'
    }
    else {
        items.innerHTML += '<div id="itemGrid"></div>'
        var itemGrid = document.getElementById("itemGrid")

        for (let i = 18 * (page - 1); i < itemInventory.length && i < 18 * page; i++) {
            itemGrid.innerHTML += `<div class="invItem" onclick="displayInventoryItem(${i})" style="background-image: url('${itemInventory[i].sprite}')"></div>`
        }

        if (page != 1) {
            items.innerHTML += `<button id="pageLeft" onclick="loadItems(${page - 1})">&lt;</button>`
        }

        items.innerHTML += `<p id="pageCount">Page ${page}</p>`

        if ((page * 18) < itemInventory.length) {
            items.innerHTML += `<button id="pageRight" onclick="loadItems(${page + 1})">&gt;</button>`
        }
    }
}

// The menu the player sees when starting a game
// Displays the current enemy, player options, player health, a textbox to say what's happening, and buttons to leave or continue
function loadGameScreen() {

    floor = 1

    var main = document.getElementById("main")
    main.innerHTML = `
        <div id="gameScreen">
            <h2 id="enemyInfo"></h2>
            <img id="enemySprite" alt="Picture of the enemy"></img>
        </div>
        <div id="buttons">
            <button id="attackButton" onClick="playerAttack()">ATTACK</button>
            <button id="unknownAbility1">[LOCKED (LVL. 5)]</button>
            <button id="unknownAbility2">[LOCKED (LVL. 10)]</button>
            <button id="unknownAbility3">[LOCKED (LVL. 15)]</button>
        </div>
        <div id="health">
            <h2>Health: ${health} / ${maxHealth}</h2>
        </div>
        <div id="textbox"></div>
        <div id="bottomButtons">
            <button id="goBack" onclick="loadMainMenu()">GO BACK</button>
            <button id="nextFloor" onclick="enterNextFloor()">NEXT FLOOR</button>
        </div>
    `

    getEnemy()
    document.getElementById("enemyInfo").innerHTML = `${currentEnemy.name} (${currentEnemy.health}/${enemyMaxHealth})`
    document.getElementById("enemySprite").src = currentEnemy.sprite
}

// Gets a random enemy from the pool of available enemies and loads it into the game
function getEnemy() {
    var enemyIndex = Math.floor(Math.random() * enemyPool.length)
    currentEnemy = Object.assign(new Enemy(), enemyPool[enemyIndex])
    enemyMaxHealth = currentEnemy.health

    enemyDrops = [];
    var strDrops = currentEnemy.lootTable;
    for (let i = 0; i < strDrops.length; i++) {
        var item = Object.assign(new Item(), itemPool.find(element => element.name == strDrops[i]))
        enemyDrops.push(item)
    }

    document.getElementById("enemyInfo").innerHTML = `${currentEnemy.name} (${currentEnemy.health}/${enemyMaxHealth})`
    document.getElementById("enemySprite").src = currentEnemy.sprite
    document.getElementById("enemySprite").style.visibility = "visible"
}

// Makes the player attack the enemy and checks to see if that killed the enemy
function playerAttack() {
    if (currentEnemy.health > 0) {
        var textbox = document.getElementById("textbox")
        textbox.innerHTML = ``
        var enemyInfo = document.getElementById("enemyInfo")

        var didCrit = Math.floor(Math.random() * 100) < crit
        if (didCrit) {
            currentEnemy.health -= damage * 2
            textbox.innerHTML += `<p>CRITICAL HIT! You did ${damage * 2} damage to ${currentEnemy.name}.</p>`
        }
        else {
            currentEnemy.health -= damage
            textbox.innerHTML += `<p>You did ${damage} damage to ${currentEnemy.name}.</p>`
        }

        if (currentEnemy.health > 0) {
            enemyInfo.innerHTML = `${currentEnemy.name} (${currentEnemy.health}/${enemyMaxHealth})`
            enemyAttack()
        }
        else {
            enemyInfo.innerHTML = ``
            document.getElementById("enemySprite").style.visibility = "hidden";
            textbox.innerHTML += `<p>${currentEnemy.name} was defeated! You gained ${currentEnemy.expDrop} exp.</p>`
            gainExp(currentEnemy.expDrop)
            dropLoot()
        }
    }
}

// Makes the enemy attack the player and checks to see if that attack kills the player
function enemyAttack() {
    var textbox = document.getElementById("textbox")
    var playerHealth = document.getElementById("health")

    var didDodge = Math.floor(Math.random() * 100) < dodge
    if (didDodge) {
        textbox.innerHTML += `<p>You dodged ${currentEnemy.name}'s attack.`
    }
    else {
        health -= currentEnemy.damage
        playerHealth.innerHTML = `<h2>Health: ${health} / ${maxHealth}</h2>`
        textbox.innerHTML += `<p>${currentEnemy.name} did ${currentEnemy.damage} damage to you.`
        if (health <= 0) {
            textbox.innerHTML += '<p>You were defeated!</p>'
            document.getElementById("buttons").style.visibility = "hidden"
        }
    }
}

// If the current enemy is defeated, go up one floor and spawn a new enemy
function enterNextFloor() {
    document.getElementById("textbox").innerHTML = ``
    if (currentEnemy.health <= 0) {
        floor += 1
        getEnemy()
    }
}

// Goes through each item an enemy could possibly drop and randomly determines if each one drops or not
function dropLoot() {
    var textbox = document.getElementById("textbox")

    for (const item of enemyDrops) {
        var chance = dropRarities.get(item.rarity)
        if (chance > Math.random()) {
            textbox.innerHTML += `<p>You found a <span class="${item.rarity}">${item.name} (${item.rarity})</span>.</p>`
            itemInventory.push(item);
        }
    }
}

// Makes the player gain experience points and checks to see if they level up
function gainExp(expGained) {
    exp += expGained
    if (exp >= expNeeded) {
        level += 1
        baseDamage += 1
        damage += 1 // Increase the damage during the current run
        baseMaxHealth += 3
        maxHealth += 3 // Increase the max health during the current run
        document.getElementById("health").innerHTML = `<h2>Health: ${health} / ${maxHealth}</h2>`
        document.getElementById("textbox").innerHTML += `<p class="uncommon"><b>LEVEL UP!</b> (+3 base health, +1 base damage)</p>`
        exp -= expNeeded
        expNeeded += 5
    }
}