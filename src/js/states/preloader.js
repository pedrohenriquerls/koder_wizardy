var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //this.load.image('testsprite', 'assets/test.png');

    this.load.tilemap('level1', 'assets/maps/first_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('scenarioSprites', 'assets/images/blockLayer/stone_bricks.png');
    this.load.image('playerSprites', 'assets/images/Players.png');
    this.load.image('objectsSprites', 'assets/images/weapons_spells_torch_key_gems.png');
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
