
var timerTick = function() {
		/*jshint validthis:true */
		if(!this.timer)
			return
		var myTime = (this.type == 'down') ? this.remainingTime() : this.timer.seconds;
		this.rect.width = Math.max(0, (myTime / this.totalTime) * this.fullWidth);
		this.sprite.crop(this.rect);
	}

var VisualTimer = function(opts) {
		this.destroyed = false
		this.type = 'down';
		if (opts.type) {
			this.type = opts.type;
		}
		this.totalTime = opts.seconds;
		this.game = opts.game;
		this.onComplete = opts.onComplete;
		var key = 'timer';
		if (opts.key) {
			key = opts.key;
		}
		this.empty = this.game.add.sprite(0, 0, key, 1);
		this.empty.fixedToCamera = true;
  	this.empty.cameraOffset.setTo(opts.x, opts.y);

		this.sprite = this.game.add.sprite(0, 0, key, 0);
		this.sprite.fixedToCamera = true;
  	this.sprite.cameraOffset.setTo(opts.x, opts.y);
		
		this.fullWidth = this.sprite.width;
		this.reset();
	}

	VisualTimer.prototype = {
		reset: function() {
			console.log(this.destroyed)
			if(this.destroyed)
				return

			if (this.timer) {
				this.timer.stop();
			}

			var self = this;
			this.hasFinished = false;
			this.timer = this.game.time.create(true);
			this.timer.repeat(Phaser.Timer.SECOND, this.totalTime, timerTick, this);
			this.timer.onComplete.add(function() {
				self.hasFinished = true;
				if (self.onComplete) {
					self.onComplete();
				}
			});
			this.rect = new Phaser.Rectangle(0, 0, 0, this.sprite.height);
			if (this.type == 'down') {
				this.sprite.crop(null);
			} else {
				this.sprite.crop(this.rect);
			}
		},

		destroy: function(){
			this.timer = null
			this.destroyed = true

			this.sprite.destroy()
			this.empty.destroy()
		},

		setTime: function(seconds) {
			this.totalTime = seconds;
			this.reset();
		},

		start: function() {
			if(this.destroyed)
				return
			this.reset();
			this.timer.start();
		},

		stop: function() {
			this.timer.stop();
		},

		pause: function() {
			this.timer.pause();
		},

		resume: function() {
			this.timer.resume();
		},

		remainingTime: function() {
			return this.totalTime - this.timer.seconds;
		}
	};


	


module.exports = VisualTimer;
