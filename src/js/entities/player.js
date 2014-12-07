var FightSystem = require('../states/fight');
var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'playerSprites');
  game.physics.arcade.enable(this);

  this.body.collideWorldBounds = true

  this.cursors = game.input.keyboard.createCursorKeys();

  game.add.existing(this);
  game.camera.follow(this);

  this.loadAnimations()

  window.enemysKilled = 0

  this.velocity = 60
  this.fps = 6

  this.fighting = false
  this.loadSkills()

  this.playerClone = null
  this.enemyClone = null

  window.player = this
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Player.prototype.update = function() {
  //player movement

  this.body.velocity.y = 0;
  this.body.velocity.x = 0;

  if(window.player.fighting || this.fighting)
    return

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
      var style = { font: "10px Arial", fill: "#fffff"};
      var game = window.player.game
      var t = game.add.text(0, 0, JSON.stringify(enemy, null, " "), style);
      t.fixedToCamera = true;
      t.cameraOffset.setTo(0, 0);

      game.add.tween(t).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 5000, 0, false).onUpdateCallback(function(){
        window.setTimeout(function(){
          t.destroy()  
        }, 2000)
      });
    }
  }
}

Player.prototype.fight = function(player, enemy){
  if(window.player.fighting == true)
    return
    
  window.player.fighting = true
  console.log("fight time!!!")
  
  var game = player.game

  //var arena = new Phaser.Rectangle(150, player.y, 150, 200);
  //arena.fill('#0fffff')

  window.playerClone = game.add.sprite(150, player.y, player.generateTexture());
  window.enemyClone  = game.add.sprite(250, player.y, enemy.generateTexture());

  player.visible = false
  enemy.visible = false
  
  var fightSystem = new FightSystem(player, enemy)

  window.currentEnemy = enemy.instance.attrsProfile
  fightSystem.createEditor()

  //this.fighting = false
}

Player.prototype.clearFightScene = function(){
  window.playerClone.destroy()
  window.enemyClone.destroy()
  this.visible = true
  this.fighting = false
}

module.exports = Player;
