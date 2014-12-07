var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    var x = this.game.width / 2;
    var y = this.game.height / 2;
    this.stage.backgroundColor = '#4b0049'

    var title = this.add.text(40, 20, "Koder Wizard", { font: "50px Wizards Magic", fill: "#ffffff", align: "center" });

    var start = this.add.text(140, 200, "Press to Start", { font: "16px Wizards Magic", fill: "#ffffff", align: "center" });
    //var instructions = this.add.text(150, 250, "Instructions", { font: "16px Wizards Magic", fill: "#ffffff", align: "center" });
    
    //start.inputEnabled = true
    //start.events.onInputUp.add(this.onDown)
    this.input.onDown.add(this.onDown, this);

    //instructions.inputEnabled = true
    //instructions.events.onInputUp.add(this.gotoInstructions)
  },

  update: function () {
  },

  onDown: function () {
    this.game.state.start("Game");
  },
  gotoInstructions: function(){
    
  }
};
