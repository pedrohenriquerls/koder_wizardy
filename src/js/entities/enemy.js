var Utils = require('../utils');
var SkullProfiles = require('../profiles/skulls');

var Enemy = function (sprite) {
  //sprite.body.moves = false;
  sprite.physicsBodyType = Phaser.Physics.ARCADE;
  sprite.body.collideWorldBounds = true

  sprite.target = window.player;

  // Set the pivot point for this sprite to the center
  sprite.anchor.setTo(0.5, 0.5);

  // Enable physics on this object
  sprite.game.physics.enable(sprite, Phaser.Physics.ARCADE);

  // Define constants that affect motion
  sprite.MAX_SPEED = 50; // pixels/second
  sprite.MIN_DISTANCE = 0; // pixels

  sprite.animations.add('walkBottom', [0,1], 10);
  sprite.animations.add('walkTop', [2,3], 10);
  sprite.animations.add('walkRight', [4,5], 10);
  sprite.animations.add('walkLeft', [6,7], 10);
  sprite.animations.add('dead', [8], 0);

  sprite.alive = true
  this.sprite = sprite

  this.profileGenerator()
  var self = this

  sprite.update = function(){
  	if(self.attrsProfile.life <= 0 && this.alive){
      window.globalHud.showFightAction(self.attrsProfile.name, "Has defeated!!")
  		this.alive = false
      sprite.animations.play('dead', 1)
      window.enemyClone.setTexture(sprite.generateTexture())
  		
      setTimeout(function(){
  		  window.enemysKilled++
  		  window.player.clearFightScene()

        sprite.destroy()
      }, 1000)
  	}else{
      var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);
      if(distance <= 45){
        // If the distance > MIN_DISTANCE then move
        if (distance > this.MIN_DISTANCE) {
            // Calculate the angle to the target
            var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);
            if(rotation > 1)
              this.animations.play('walkBottom', 6);
            else
              this.animations.play('walkTop', 6);

            // Calculate velocity vector based on rotation and this.MAX_SPEED
            this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
            this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
        } else {
            this.body.velocity.setTo(0, 0);
        }
      }else
         this.body.velocity.setTo(0, 0);
    }
  }
}

Enemy.prototype.profileGenerator = function(name){
  var id = Math.round(Utils.rollDice(0, SkullProfiles.length -1))
  var skullProfile = SkullProfiles[id]
	this.attrsProfile = {
    name: skullProfile.name,
    life: skullProfile.life,
    power: skullProfile.power,
    description: skullProfile.description
  }
}

Enemy.prototype.attack = function(callback){
  if(!this.sprite.alive){
    if(callback)
      callback()
    return
  }
    
  window.globalHud.showFightAction(this.attrsProfile.name, "Attack!!")

  var attackOverload = this.attrsProfile.attack
  if(attackOverload){
    attackOverload()
  }else{
    var maxDmg = this.attrsProfile.power
    var dmg = Utils.rollDice(0, maxDmg > 0 ? maxDmg : 1)

    window.player.life -= dmg
  }
  
  window.player.timer.reset()
  if(callback)
    callback()

  window.player.timer.start()
}

module.exports = Enemy;
