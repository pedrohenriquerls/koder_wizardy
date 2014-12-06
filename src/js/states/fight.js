var FightSystem = function (player, enemy) {
  this.player = player
  this.enemy  = enemy
}

FightSystem.prototype.createEditor = function(){
  this.editor = ace.edit("editor");
  //editor.setTheme("ace/theme/monokai");
  this.editor.getSession().setMode("ace/mode/javascript");
}

module.exports = FightSystem;