game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
//Resets the game onto the level that it is setted too.
                me.levelDirector.loadLevel("HamletLevel01");
                
                this.resetPlayer(0, 400);
//These are codes for making the person be able to press right, up, and left during the game.                
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.UP, "jump");
                me.input.bindKey(me.input.KEY.LEFT, "left");


                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},
	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        //Resets the player in the game when starting or restarting the game.
        resetPlayer:function(){
            var player = me.pool.pull("mario", 0, 400, {});
            me.game.world.addChild(player, 21);
        }
});
