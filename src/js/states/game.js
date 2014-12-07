var Player = require('../entities/player');
var Enemy = require('../entities/enemy');

var Game = function () {
  this.player = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.map = this.game.add.tilemap('level1');
    //this.game.world.setBounds(0, 0, 1920, 1920);

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('stone_bricks', 'scenarioSprites');
    this.map.addTilesetImage('weapons_spells_torch_key_gems', 'objectsSprites');
    this.map.addTilesetImage('Players', 'playerSprites');
    this.map.addTilesetImage('monsters', 'monstersSprites');

    //create layer
    this.groundLayer = this.map.createLayer('groundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    var playerPosition = this.findObjectsByType('playerStart', this.map, 'playerLayer')
    this.player = new Player(this.game, playerPosition[0].x, playerPosition[0].y)

    /** Spawning Skulls **/
    this.skulls = this.game.add.group();

    this.skulls.enableBody = true;
    this.skulls.instances = []

    var skulls = this.findObjectsByType('skull', this.map, 'enemiesLayer')
    skulls.forEach(function(skull){
      var _skull = this.skulls.create(skull.x, skull.y, "monstersSprites")
      _skull.instance = new Enemy(_skull)
    }, this)
    //this.game.add.tween(this.skulls).to( { x: -100 }, 2000, Phaser.Easing.Linear.None, true, 0, 100, true);

    //resizes the game world to match the layer dimensions
    this.blockedLayer.resizeWorld();
  },

  update: function(){
    this.player.addCollider(this.game, this.blockedLayer)
    this.game.physics.arcade.overlap(this.player, this.skulls, this.player.fight, null, this);
  },

  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
};
