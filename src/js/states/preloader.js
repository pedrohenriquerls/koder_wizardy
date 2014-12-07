var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(100, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //this.load.image('testsprite', 'assets/test.png');

    this.load.tilemap('level1', 'assets/maps/first_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('scenarioSprites', 'assets/images/blockLayer/stone_bricks.png');
    this.load.image('objectsSprites', 'assets/images/weapons_spells_torch_key_gems.png');

    this.load.spritesheet('playerSprites', 'assets/images/players-mages.png', 16, 16);
    this.load.spritesheet('monstersSprites', 'assets/images/monsters.png', 16, 16);
    this.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);
  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('Menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
