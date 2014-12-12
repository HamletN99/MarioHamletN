// TODO
//These are codes for the games player entity for the characters width and height and fiting in the screen//
game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
             image: "mario",
             spritewidth : "128",
             spriteheight : "128",
             width : 128,
             height : 128,
             getShape: function(){
                 return(new me.Rect(0, 0, 30, 128)).toPolygon();
             }
         }]);
//These are codes for make the animations in the game to make different things happen to the character when eating the mushroom and getting attacked by the bad guys//
        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("bigIdle",[19]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
        this.renderable.addAnimation("BigWalk", [14, 15, 16, 17, 18, 19], 80);
        this.renderable.addAnimation("shrink", [0, 1, 2, 3], 80);
        this.renderable.addAnimation("grow", [4, 5, 6, 7], 80);
        
//These codes show the idle is the current animation in the game and when he is big it is false and it sets it velocity and how it is supposed to be viewed//        
        this.renderable.setCurrentAnimation("idle");
        
        this.big = false;
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
//This update function code updates in the game so the character could go left and right and jump.
//Also the flipx is false for right because if it was then it would be right and jump not left.
    update : function (delta){
         if (me.input.isKeyPressed('left')) {
            this.flipX(true);
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
    } 
          else if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
             this.flipX(false);
        } else{
            this.body.vel.x = 0;
        }
        if(me.input.isKeyPressed("jump")){
         if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }   
        }
        
//These codes shoe when the character touches the mushroom what happens and what happens after the bad guy touches him.        
       this.body.update(delta);
       me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(!this.big){
        if(this.body.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("smallWalk")&& !this.renderable.setCurrentAnimation("grow") && !this.renderable.setCurrentAnimation("shrink")){
            this.renderable.setCurrentAnimation("smallWalk");
            this.renderable.setAnimationFrame();
           }
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
    }else{
        if(this.body.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("BigWalk") && !this.renderable.setCurrentAnimation("grow") && !this.renderable.setCurrentAnimation("shrink")){
            this.renderable.setCurrentAnimation("BigWalk");
            this.renderable.setAnimationFrame();
           }
        }else{
            this.renderable.setCurrentAnimation("bigIdle");
        }
    }      
        
        this._super(me.Entity, "update", [delta]);
       return true;
    },
  //The collide handler function makes the code for shrinking and the badguys response and what happens after.  
    collideHandler: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        console.log(ydif);

        if (response.b.type === 'badguy') {
            if (ydif <= -115) {
                response.b.alive = false;
            } else {
                if(this.big){
                    this.big = false;
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                    this.jumping = true;
                    this.renderable.setCurrentAnimation("shrink", "idle");
                    this.renderable.setAnimationFrame();
                }else{
                me.state.change(me.state.MENU);
            }
            }

        } else if (response.b.type === 'mushroom') {
            this.big = true;
            this.renderable.setCurrentAnimation("grow", "bigIdle");
            me.game.world.removeChild(response.b);
        }
    }

}); 
//These lines of code triggers the level in the game.
game.LevelTrigger = me.Entity.extend({
    init: function (x, y, settings){
        this._super(me.Entity, "init",[x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});
//The bad guys code shows the width and height of the monster and its shape.
game.BadGuy = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
             image: "slime",
             spritewidth : "60",
             spriteheight : "28",
             width : 60,
             height : 28,
             getShape: function(){
                 return(new me.Rect(0, 0, 60, 28)).toPolygon();
             }
         }]);
     
         this.spritewidth = 60;
         var width = settings.width;
         x= this.pos.x;
         this.startX = x;
         this.endX = x + width - this.spritewidth;
         this.pos.x = x + width - this.spritewidth;
         this.updateBounds();
         
         this.alwaysUpdate = true;
         
         this.walkLeft = false;
         this.alive = true;
         this.type = "badguy";
         
         this.renderable.addAnimation("run", [0,1,2],80);
         this.renderable.setCurrentAnimation("run");
         
         this.body.setVelocity(4, 6);
    },
    
    update: function(delta){
        this.body.update(delta);
        me.collision.check(this, true, this.collidHandler.bind(this), true);
        
        if(this.alive){
            if(this.walkLeft && this.pos.x <= this.startX){
                this.walkLeft = false;
            }else if(!this.walkLeft && this.pos.x >= this.endX ){
                this.walkLeft = true;
            }
            this.flipX(!this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            
        }else{
            me.game.world.removeChild(this);
        }
        
        this._super(me.Entity, "update", [delta]);
        return true;
        
    },
    
    collidHandler: function (response){
        
    }
    
});
//These lines of code is for the mushrooms height and width and to keep its shape a current amount for the character
//Also the collision check is for making the mushroomnot go in the collision
game.Mushroom = me.Entity.extend({
init: function (x, y, settings){
this._super(me.Entity, 'init', [x, y, {
image: "mushroom",
        spritewidth : "64",
        spriteheight : "64",
        width : 60,
        height : 28,
        getShape: function(){
        return(new me.Rect(0, 0, 64, 64)).toPolygon();
        }
    }]);
        me.collision.check(this);
        this.type = "mushroom";
}


});
