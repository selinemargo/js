class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("world_Level01", "assets/Map-Level01.json");
    
    this.load.image("Pipo-map-img", "assets/pipo-map001_at.png");
    this.load.image("pipoya-img", "assets/pipoya.png");

    this.load.spritesheet('abang', 'assets/abngBambang.png',{ frameWidth:64, frameHeight:64 });
    this.load.spritesheet('cow', 'assets/cowsBrown.png',{ frameWidth:32, frameHeight:32 });
    this.load.spritesheet('badCow', 'assets/cowsBlack.png',{ frameWidth:32, frameHeight:32 });

  }

  create() {
    console.log("*** world scene");

    this.beefText = this.add.text(
      100, 100, 'Cow: 0', { fontSize: '24px', fill: '#ff00ff' }
    ).setScrollFactor(0)
    .setDepth(999);

    this.lifeText = this.add.text(
      300, 100, 'Life: 0', { fontSize: '24px', fill: '#ff00ff' }
    ).setScrollFactor(0)
    .setDepth(999);

    this.lifeText.setText(`Life: ${life}`)

    this.anims.create({
      key: "abang-up",
      frames: this.anims.generateFrameNumbers("abang", { start: 1, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "abang-left",
      frames: this.anims.generateFrameNumbers("abang", { start: 14, end: 21 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "abang-down",
      frames: this.anims.generateFrameNumbers("abang", { start: 28, end: 34 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "abang-right",
      frames: this.anims.generateFrameNumbers("abang", { start: 40, end: 47 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
        key:'cow-normal',
        frames:this.anims.generateFrameNumbers('cow',
        { start:0, end:2 }),
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'cow-rest',
        frames:this.anims.generateFrameNumbers('cow',
        { start:9, end:12 }),
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'cow-tongue',
        frames:this.anims.generateFrameNumbers('cow',
        { start:13, end:16 }),
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'badCow-normal',
        frames:this.anims.generateFrameNumbers('badCow',
        { start:0, end:2 }),
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'badCow-rest',
        frames:this.anims.generateFrameNumbers('badCow',
        { start:9, end:12 }),
        frameRate:1,
        repeat: -1
    });

    this.anims.create({
        key:'badCow-tongue',
        frames:this.anims.generateFrameNumbers('badCow',
        { start:13, end:16 }),
        frameRate:1,
        repeat: -1
    });


    // Create the map from main
    let map = this.make.tilemap({
      key: "world_Level01",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoTiles = map.addTilesetImage("pipo-map001_at", "Pipo-map-img");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya-img");

    let tilesArray = [pipoTiles, pipoyaTiles]

    this.WaterLayer = map.createLayer(
      "Water",
      tilesArray,
      0,
      0
    );

    this.GrassLayer = map.createLayer(
      "Grass",
      tilesArray,
      0,
      0
    );

    this.TreesLayer = map.createLayer(
      "Trees",
      tilesArray,
      0,
      0
    );

    this.DecorLayer = map.createLayer(
      "Decor",
      tilesArray,
      0,
      0
    );

    this.BridgeLayer = map.createLayer(
      "Bridge",
      tilesArray,
      0,
      0
    );

    this.FenceLayer = map.createLayer(
      "Fence",
      tilesArray,
      0,
      0
    );

    this.physics.world.bounds.width = this.GrassLayer.width;
    this.physics.world.bounds.height = this.GrassLayer.height;

    //let start = map.findObject("objectLayer",(obj) => obj.name === "start");
    this.player = this.physics.add.sprite(110, 1460, 'abang');
    window.player = this.player;
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.7)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey('SPACE');

    this.cow1 = this.physics.add.sprite(1200, 800, 'cow').setScale(2).play('cow-rest')
    this.cow2 = this.physics.add.sprite(1425, 1407, 'cow').setScale(2).play('cow-tongue')
    this.cow3 = this.physics.add.sprite(185, 1020, 'cow').setScale(2).play('cow-normal')
    this.cow4 = this.physics.add.sprite(82, 290, 'cow').setScale(2).play('cow-rest')
    this.cow5 = this.physics.add.sprite(720, 110, 'cow').setScale(2).play('cow-tongue')
    this.cow6 = this.physics.add.sprite(1400, 280, 'cow').setScale(2).play('cow-normal')
    this.cow7 = this.physics.add.sprite(560, 1465, 'cow').setScale(2).play('cow-rest')


    this.badCow1 = this.physics.add.sprite(1390, 1015, 'badCow').setScale(2).play('badCow-normal')
    this.badCow2 = this.physics.add.sprite(765, 1065, 'badCow').setScale(2).play('badCow-tongue')
    this.badCow3 = this.physics.add.sprite(930, 1484, 'badCow').setScale(2).play('badCow-normal')
    this.badCow4 = this.physics.add.sprite(1495, 565, 'badCow').setScale(2).play('badCow-rest')
    this.badCow5 = this.physics.add.sprite(265, 448, 'badCow').setScale(2).play('badCow-tongue')
    this.badCow6 = this.physics.add.sprite(418, 98, 'badCow').setScale(2).play('badCow-normal')

    this.physics.add.overlap(this.player, [this.cow1, this.cow2, this.cow3, this.cow4, this.cow5, this.cow6, this.cow7], this.collectCow, null, this);

    this.physics.add.overlap(this.player, [this.badCow1, this.badCow2, this.badCow3, this.badCow4, this.badCow5, this.badCow6], this.hitCow, null, this);

    this.TreesLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.TreesLayer);

    this.FenceLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.FenceLayer);

    this.WaterLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.WaterLayer);
  

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

  } /////////////////// end of create //////////////////////////////

  update() {

     let speed = 200;

if (this.cursors.left.isDown) {
	this.player.body.setVelocityX(-speed);
	this.player.anims.play("abang-left", true);
} else if (this.cursors.right.isDown) {
	this.player.body.setVelocityX(speed);
	this.player.anims.play("abang-right", true);
} else if (this.cursors.up.isDown) {
	this.player.body.setVelocityY(-speed);
	this.player.anims.play("abang-up", true);
} else if (this.cursors.down.isDown) {
	this.player.body.setVelocityY(speed);
	this.player.anims.play("abang-down", true);
} else {
	this.player.anims.stop();
	this.player.body.setVelocity(0, 0);
}


if(cowCounter >= 7){
  this.Intro2();
}



  } /////////////////// end of update //////////////////////////////

  collectCow(player, cow){
      console.log("Player collect Cow");

      cowCounter++
      
			// play a sound
      //this.collectPotatoSnd.play()   

      this.beefText.setText(`Cow: ${cowCounter}`);


      // disable body
      cow.disableBody (true, true);
   }

  hitCow(player, badCow){
      console.log("Player took Bad cow");
      
      life--
			//shake screen

	    this.cameras.main.shake(300);    

      this.lifeText.setText(`Life: ${life}`);

      //disable body
      badCow.disableBody (true, true);

      if(life < 1)
      this.scene.start ("gameOver", {level : 1})
   }

   Intro2() {
    this.scene.start ("Intro2");
   }

  
} //////////// end of class world ////////////////////////
