var SkullProfiles = require('../profiles/skulls');

var Enemy = function (sprite) {
  sprite.body.moves = false;
  sprite.body.collideWorldBounds = true
  sprite.physicsBodyType = Phaser.Physics.ARCADE;

  this.alive = true

  this.profileGenerator()
  var self = this

  sprite.update = function(){
  	if(self.attrsProfile.life <= 0 && this.alive){
  		this.alive = false
  		
  		window.enemiesKilled++
  		window.player.clearFightScene()

  		this.destroy()
  	}
  }
}

Enemy.prototype.profileGenerator = function(name){
  var skullProfile = SkullProfiles[0]
	this.attrsProfile = {
    name: skullProfile.name,
    life: skullProfile.life,
    power: skullProfile.power,
    description: skullProfile.description
  }
}

module.exports = Enemy;
