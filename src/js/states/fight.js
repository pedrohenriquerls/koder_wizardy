var FightSystem = function (player, enemy) {
  this.player = player
  this.enemy  = enemy
}
var suggestions = [
  {name: 'fireball', value: 'fireball()', score: '1', meta: 'spell'},
  {name: 'frostNova', value: 'frostNova()', score: '1', meta: 'spell'},
  {name: 'if', value: 'if', score: '1', meta: 'keyword'},
  {name: 'else', value: 'else', score: '1', meta: 'keyword'},
  {name: 'for', value: 'for', score: '1', meta: 'keyword'},
  {name: 'switch', value: 'switch', score: '1', meta: 'keyword'},
  {name: 'case', value: 'case', score: '1', meta: 'keyword'},
];
FightSystem.prototype.createEditor = function(){
  ace.require("ace/ext/language_tools");
  this.editor = ace.edit("editor");
  this.editor.setOptions({enableBasicAutocompletion: true});
  var completer = {
    getCompletions: function(editor, session, pos, prefix, callback) {
      callback(null, suggestions);
    }
  };

  this.editor.completers = [completer];
  this.editor.getSession().setMode("ace/mode/javascript");
  window.editor = this.editor;

  executeLabel = this.player.game.add.text(0, 0, 'Koderify!!', { font: '24px Wizards Magic', fill: '#fff' });
  executeLabel.inputEnabled = true;
  executeLabel.events.onInputUp.add(this.execute)
  executeLabel.fixedToCamera = true;
  executeLabel.cameraOffset.setTo(280, 260);

	if(this.editor.getValue().trim() == "")
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
		skills: self.playerSkills,
    debug: self.playerSkills.debug
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
	this.editor.insert("//You are the greater master of creation and destruction here\n")
  this.editor.insert("//Change enemies attributes and create new spells\n")
}

module.exports = FightSystem;