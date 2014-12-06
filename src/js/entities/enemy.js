var Enemy = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'monstersSprites');
  game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function() {
};

module.exports = Enemy;
