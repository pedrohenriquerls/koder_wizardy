var FightSystem = function (player, enemy) {
  this.player = player
  this.enemy  = enemy
}

FightSystem.prototype.createEditor = function(){
  this.editor = ace.edit("editor");
  //editor.setTheme("ace/theme/monokai");
  this.editor.getSession().setMode("ace/mode/javascript");
  window.editor = this.editor

  execute_label = this.player.game.add.text(300, 590, 'Execute', { font: '24px Arial', fill: '#fff' });
  execute_label.inputEnabled = true;
  execute_label.events.onInputUp.add(this.execute)

  this.basicCode()
}

FightSystem.prototype.createQuest = function(){
	return "The enemy dont do nothing if u attack him now!"
}

FightSystem.prototype.execute = function(){
	var self = this
	var code = this.editor.getValue();

	var worldThings = {
		enemy: self.currentEnemy,
		skills: self.playerSkills
	}

	var params = [];
  var args = [];

  var sadboxMock = Object.create(null);

  for (var param in worldThings) {
    if (worldThings.hasOwnProperty(param)) {
      args.push(worldThings[param]);
      params.push(param);
    }
  }

  var context = Array.prototype.concat.call(sadboxMock, params, code); // create the parameter list for the sandbox
  var sandbox = new (Function.prototype.bind.apply(Function, context)); // create the sandbox function
  context = Array.prototype.concat.call(sadboxMock, args); // create the argument list for the sandbox

  var sandboxFunction = Function.prototype.bind.apply(sandbox, context); // bind the local variables to the sandbox
  sandboxFunction()
}

FightSystem.prototype.basicCode = function(){
	this.editor.insert("alert(enemy.teste)")
}

module.exports = FightSystem;