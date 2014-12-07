var Player = require('../entities/player');
var Enemy = require('../entities/enemy');

var Game = function () {
  this.player = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.map = this.game.add.tilemap('level1');
    

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

      Object.keys(skull.properties).forEach(function(key){
        _skull[key] = skull.properties[key];
      });
      _skull.instance = new Enemy(_skull)
    }, this)
    
    this.blockedLayer.resizeWorld();

    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
    this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
  },

  update: function(){
    this.player.addCollider(this.game, this.blockedLayer)
    this.game.physics.arcade.overlap(this.player, this.skulls, this.player.fight, null, this);

    this.updateShadowTexture();   
    this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
  },
  updateShadowTexture: function(){
    // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    var radius = 50 + this.game.rnd.integerInRange(1,5),
        heroX = this.player.x - this.game.camera.x + 9,
        heroY = this.player.y - this.game.camera.y + 10;
    if(this.player.fighting){
      heroX = heroY = 1000
    }
   
    // Draw circle of light with a soft edge
    var gradient =
        this.shadowTexture.context.createRadialGradient(
            heroX, heroY, 40 * 0.75,
            heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
    this.shadowTexture.context.fill();

    this.shadowTexture.dirty = true;
  },

  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  }
};
