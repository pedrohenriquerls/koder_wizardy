var SkullProfiles = require('../profiles/skulls');

var Enemy = function (sprite) {
  sprite.body.moves = false;
  sprite.body.collideWorldBounds = true
  sprite.physicsBodyType = Phaser.Physics.ARCADE;

  this.profileGenerator()
}

Enemy.prototype.profileGenerator = function(name){
	this.attrsProfile = SkullProfiles[0]
}

module.exports = Enemy;
