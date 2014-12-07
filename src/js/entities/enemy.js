var Enemy = function (game, x, y, type) {
  Phaser.Sprite.call(this, game, x, y, 'monstersSprites');
  game.add.existing(this);
  game.physics.arcade.enable(this);

  //this.body.collideWorldBounds = true
  this.body.moves = false;
  this.anchor.setTo(0, 0);
  this.physicsBodyType = Phaser.Physics.ARCADE;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function() {
};

Enemy.prototype.teste = function(){
	console.log("teste")
}


module.exports = Enemy;
