var GlobalHud = function (game, player, enemy) {
	this.game  = game
	this.group = game.add.group();

	this.player = player
	this.enemy  = enemy

	this.style = { font: '24px Wizards Magic', fill: '#fff' }
}

GlobalHud.prototype.getStyle = function(){
	return new Object(this.style)
}

GlobalHud.prototype.showFightAction = function(actorName, actionName){
	var actionText = actorName+': '+ actionName
	if(!this.actions){
		var style = this.getStyle()
		style.align = "center"
		style.font = "16px Arial"
		this.actions = this.game.add.text(0, 0, actionText, style);
	}else
		this.actions.setText(actionText)

	var self = this

	this.actions.fixedToCamera = true;
  this.actions.cameraOffset.setTo(110, 100);

  this.actions.alpha = 1
  this.game.add.tween(this.actions).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 1000, 0, false)
}

GlobalHud.prototype.fightHudDestroy = function(){
	this.actions.destroy()
	this.actions = null
}

module.exports = GlobalHud;