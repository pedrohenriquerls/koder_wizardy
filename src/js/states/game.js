var Player = require('../entities/player');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('stone_bricks', 'scenarioSprites');
    this.map.addTilesetImage('weapons_spells_torch_key_gems', 'objectsSprites');
    this.map.addTilesetImage('Players', 'playerSprites');
    //this.map.addTilesetImage('monsters', 'monstersTiles');

    //create layer
    this.groundLayer = this.map.createLayer('groundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.blockedLayer.resizeWorld();
  },
};
