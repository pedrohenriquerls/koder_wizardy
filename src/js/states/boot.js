var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

  preload: function () {
    this.load.image('preloader', 'assets/preloader.gif');
  },

  create: function () {
    if (this.game.device.desktop) {
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setGameSize(400, 300);
    } else {
      this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      this.game.stage.scale.minWidth =  480;
      this.game.stage.scale.minHeight = 260;
      this.game.stage.scale.maxWidth = 640;
      this.game.stage.scale.maxHeight = 480;
      this.game.stage.scale.forceLandscape = true;
      this.game.stage.scale.pageAlignHorizontally = true;
      this.game.stage.scale.setScreenSize(true);
    }

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('Preloader');
  }
};
