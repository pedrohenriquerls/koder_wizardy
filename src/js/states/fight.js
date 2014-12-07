var Tutorials = require('../profiles/tutorials');
var FightSystem = function (player, enemy) {
  this.player = player
  this.enemy  = enemy
}
var suggestions = [
  {name: 'if', value: 'if', score: '1', meta: 'keyword'},
  {name: 'else', value: 'else', score: '1', meta: 'keyword'},
  {name: 'for', value: 'for', score: '1', meta: 'keyword'},
  {name: 'switch', value: 'switch', score: '1', meta: 'keyword'},
  {name: 'case', value: 'case', score: '1', meta: 'keyword'},
];
var executeLabel = null
FightSystem.prototype.createEditor = function(){
  ace.require("ace/ext/language_tools");
  this.editor = ace.edit("editor");
  this.editor.setOptions({enableBasicAutocompletion: true});
  this.editor.setFocus = function(){
    this.focus()
    session = this.getSession();
    var count = session.getLength();
    //Go to end of the last line
    this.gotoLine(count, session.getLine(count-1).length);
  }

  var completer = {
    getCompletions: function(editor, session, pos, prefix, callback) {
      for (var param in window.playerSkills) {
        if (window.playerSkills.hasOwnProperty(param)) {
          suggestions.push({name: param, value: param, score: '1', meta: 'spell'});
        }
      }
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
  //this.executeLabel = executeLabel

	if(this.editor.getValue().trim() == "")
  	this.basicCode()
}

FightSystem.prototype.createQuest = function(){
  var text = Tutorials[window.enemysKilled + 1]
  if(text)
    window.globalHud.playerMessage(text)
}

FightSystem.prototype.enableKoderify = function() {
  //window.editor.setFocus()
  executeLabel.inputEnabled = true
  executeLabel.setStyle({font: '24px Wizards Magic', fill: '#fff'});

}

FightSystem.prototype.disableKoderify = function() {
  executeLabel.inputEnabled = false
  executeLabel.setStyle({font: '24px Wizards Magic', fill: '#777'});
}

FightSystem.prototype.execute = function(){
	var self = this
	var code = this.editor.getValue();

	var worldThings = {
		enemy: self.currentEnemy,
		skills: self.playerSkills,
    debug: new Object(self.playerSkills.debug),
    window: {},
    document: {}
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
  try{
    sandboxFunction()  
  }catch(e){
    window.globalHud.playerMessage("Error: "+e)
  }
  
}

FightSystem.prototype.basicCode = function(){
	this.editor.insert("//You are the greater master of creation and destruction here\n")
  this.editor.insert("//Change enemies attributes and create new spells\n")
  this.editor.insert("//Ctrl+Space for use the power of autocomplete\n")
  this.editor.insert("")
  this.editor.setFocus()
}

module.exports = FightSystem;