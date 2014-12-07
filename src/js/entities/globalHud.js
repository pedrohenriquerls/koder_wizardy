var GlobalHud = function (game, player, enemy) {
	this.game  = game
	this.group = game.add.group();

	this.player = player
	this.enemy  = enemy

	this.style = { font: '24px Wizards Magic', fill: '#fff' }
	window.globalHud = this
}

GlobalHud.prototype.getStyle = function(){
	return new Object(this.style)
}

GlobalHud.prototype.playerMessage = function(text){
	if(!this.textBox && !this.broadcastText){
		this.textBox = this.game.add.sprite(0, 0, "boxSprite")
		this.textBox.width = 380
		this.textBox.height = 80

		this.textBox.fixedToCamera = true;
	  this.textBox.cameraOffset.setTo(0, 220);

	  var style = this.getStyle()
		style.font = "10px Arial"

	  this.broadcastText = this.game.add.text(0, 0, "", style);
	  this.broadcastText.fixedToCamera = true;
  	this.broadcastText.cameraOffset.setTo(50, 230);

  	this.textBoxGroup = this.game.add.group();

		this.textBoxGroup.add(this.textBox)
		this.textBoxGroup.add(this.broadcastText)

		this.game.add.existing(this.textBoxGroup);
	}
	this.textBoxGroup.alpha = 1
	this.broadcastText.setText(text)
	this.game.add.tween(this.textBoxGroup).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 5000, 0, false)
}

GlobalHud.prototype.createPlayerHud = function(){
	var style = this.getStyle()
	style.font = "14px Arial"

	console.log(window.player.life)
	this.life = this.game.add.text(0, 10, "Life: "+window.player.life , style);
	this.enemiesKilled = this.game.add.text(0, 10, "Score: "+ window.enemysKilled, style);

	this.life.fixedToCamera = true;
  this.life.cameraOffset.setTo(0, 30);

  this.enemiesKilled.fixedToCamera = true;
  this.enemiesKilled.cameraOffset.setTo(300, 30);
}

GlobalHud.prototype.updatePlayerHud = function(){
	this.life.setText("Life: "+Math.round(window.player.life))
	this.enemiesKilled.setText("Score: "+ window.enemysKilled)
}

GlobalHud.prototype.showFightAction = function(actorName, actionName){
	var actionText = actorName+': '+ actionName
	if(!this.actions){
		var style = this.getStyle()
		style.align = "center"
		style.font = "16px Arial"
		this.actions = this.game.add.text(0, 0, actionText, style);

		this.actions.fixedToCamera = true;
  	this.actions.cameraOffset.setTo(110, 100);
	}else
		this.actions.setText(actionText)

	var self = this

  this.actions.alpha = 1
  this.game.add.tween(this.actions).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 1000, 0, false)
}

GlobalHud.prototype.fightHudDestroy = function(){
	this.actions.destroy()
	this.actions = null
}

module.exports = GlobalHud;