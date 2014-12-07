var FightSystem = require('../states/fight');
var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'playerSprites');
  game.physics.arcade.enable(this);

  this.body.collideWorldBounds = true

  this.cursors = game.input.keyboard.createCursorKeys();

  game.add.existing(this);
  game.camera.follow(this);

  this.loadAnimations()

  this.enemysKilled = 0

  this.velocity = 60
  this.fps = 6

  this.fighting = false
  this.loadSkills()
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {
  //player movement
  if(this.fighting)
    return

  this.body.velocity.y = 0;
  this.body.velocity.x = 0;

  if(this.cursors.up.isDown) {
    this.body.velocity.y -= this.velocity;
    this.animations.play('walkTop', this.fps);
  }
  else if(this.cursors.down.isDown) {
    this.body.velocity.y += this.velocity;
    this.animations.play('walkBottom', this.fps);
  }
  if(this.cursors.left.isDown) {
    this.body.velocity.x -= this.velocity;
    this.animations.play('walkLeft', this.fps);
  }
  else if(this.cursors.right.isDown) {
    this.body.velocity.x += this.velocity;
    this.animations.play('walkRight', this.fps);
  }
}

Player.prototype.addCollider = function(game, layer){
  game.physics.arcade.collide(this, layer);
}

Player.prototype.loadAnimations = function(){
  this.animations.add('walkBottom', [0,1], 10);
  this.animations.add('walkTop', [2,3], 10);
  this.animations.add('walkRight', [4,5], 10);
  this.animations.add('walkLeft', [6,7], 10);
}

Player.prototype.loadSkills = function(){
  window.playerSkills = {
    debug: function(enemy){
      console.log(enemy)
    }
  }
}

Player.prototype.fight = function(player, enemy){
  if(this.fighting == true)
    return
    
  this.fighting = true
  console.log("fight time!!!")
  
  var game = player.game

  //var arena = new Phaser.Rectangle(150, player.y, 150, 200);
  //arena.fill('#0fffff')

  var playerClone = game.add.sprite(150, player.y, player.generateTexture());
  var enemyClone  = game.add.sprite(250, player.y, enemy.generateTexture());

  player.visible = false
  enemy.visible = false
  
  var fightSystem = new FightSystem(player, enemy)

  window.currentEnemy = enemy.instance.attrsProfile
  fightSystem.createEditor()

  //this.fighting = false
}

module.exports = Player;
