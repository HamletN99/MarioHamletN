game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
//These are resources that refer to images in places and has its title name to make it easier.
         {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
         {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
         {name: "mario", type:"image", src: "data/img/player1.png"},
         {name: "title-screen", type:"image", src: "data/img/title-screen.png"},
         {name: "slime", type:"image", src: "data/img/slime-spritesheet.png"},
         {name: "newimage2", type:"image", src: "data/img/newimage2.png"},
         //{name: "GameOver", type:"image", src: "data/img/mario crying.png"},
         {name: "mushroom", type:"image", src: "data/img/mushroom.png"},
         {name: "cloud-tiles", type:"image", src: "data/img/cloud-tiles.png"},
         
         


	/* Atlases
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
//These are codes for making it understand where to look for the maps in.
          {name: "HamletLevel01", type: "tmx", src: "data/map/HamletLevel01.tmx"},
          {name: "HamletLevel02", type: "tmx", src: "data/map/HamletLevel02.tmx"}

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
