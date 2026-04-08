class level2 extends Phaser.Scene {
  constructor() {
    super({
      key: "level2",
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
    this.load.tilemapTiledJSON("world_Level02", "assets/Map-Level02.json");

    
    this.load.image("Pipo-map-img", "assets/pipo-map001_at.png");
    this.load.image("pipoya-img", "assets/pipoya.png");
    this.load.image("basket", "assets/basket.png");

    this.load.spritesheet('abang', 'assets/abngBambang.png',{ frameWidth:64, frameHeight:64 });
    this.load.spritesheet('enemy', 'assets/rival.png',{ frameWidth:64, frameHeight:64 });
    this.load.spritesheet('ingredients', 'assets/food.png',{ frameWidth:32, frameHeight:32 });

    this.load.audio("collect","assets/collect.mp3");
    this.load.audio("hitEnemy","assets/hitEnemy.mp3");

  }

  create() {
    console.log("*** world scene");

    life = 3

    this.basketIcon = this.add.image(
    this.scale.width - 80, 30, 'basket'
    )
    .setScrollFactor(0)
    .setDepth(9999)
    .setScale(0.04); // same large PNG size as heart


    this.ingredientsText = this.add.text(
      this.scale.width - 55, 20, '0', 
    { fontSize: '24px', fill: '#ffffff' }
  )
  .setScrollFactor(0)
  .setDepth(9999);

    //Abang Bambang
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

    //Enemy
    this.anims.create({
      key: "enemy-up",
      frames: this.anims.generateFrameNumbers("enemy", { start: 1, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-left",
      frames: this.anims.generateFrameNumbers("enemy", { start: 14, end: 21 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-down",
      frames: this.anims.generateFrameNumbers("enemy", { start: 28, end: 34 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-right",
      frames: this.anims.generateFrameNumbers("enemy", { start: 40, end: 47 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
        key:'greenOnion',
        frames: [
            { key: 'ingredients', frame: 16 },
            { key: 'ingredients', frame: 48 },
            { key: 'ingredients', frame: 80 },
        ],
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'garlic',
        frames: [
            { key: 'ingredients', frame: 15 },
            { key: 'ingredients', frame: 47 },
            { key: 'ingredients', frame: 79 },
        ],
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'egg',
        frames: [
            { key: 'ingredients', frame: 493 },
            { key: 'ingredients', frame: 525 },
            { key: 'ingredients', frame: 557 },
        ],
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'lime',
        frames: [
            { key: 'ingredients', frame: 326 },
            { key: 'ingredients', frame: 358 },
            { key: 'ingredients', frame: 390 },
        ],
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'radish',
        frames: [
            { key: 'ingredients', frame: 8 },
            { key: 'ingredients', frame: 40 },
            { key: 'ingredients', frame: 72 },
        ],
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'tofu',
        frames: [
            { key: 'ingredients', frame: 488 },
            { key: 'ingredients', frame: 520 },
            { key: 'ingredients', frame: 552 },
        ],
        frameRate:5,
        repeat:-1
    });

    // Create the map from main
    let map = this.make.tilemap({
      key: "world_Level02",
    });

    // Load the game tiles
    let pipoTiles = map.addTilesetImage("pipo-map001_at", "Pipo-map-img");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya-img");

    let tilesArray = [pipoTiles, pipoyaTiles]

    //Load in layers by layers
    this.grassLayer = map.createLayer(
      "grass",
      tilesArray,
      0,
      0
    );
    
    this.treesLayer = map.createLayer(
      "trees",
      tilesArray,
      0,
      0
    );

    this.pathLayer = map.createLayer(
      "path",
      tilesArray,
      0,
      0
    );

    this.stallsLayer = map.createLayer(
      "stalls",
      tilesArray,
      0,
      0
    );

    this.decorLayer = map.createLayer(
      "decor",
      tilesArray,
      0,
      0
    );

    this.ingredientsLayer = map.createLayer(
      "ingredients",
      tilesArray,
      0,
      0
    );

    this.stallsRoofLayer = map.createLayer(
      "stallsRoof",
      tilesArray,
      0,
      0
    );


    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;


    this.player = this.physics.add.sprite(625, 1545, 'abang');
    window.player = this.player;
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.9)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.ingredients1 = this.physics.add.sprite(272, 1070, 'ingredients').setScale(1.2).play('greenOnion')
    this.ingredients2 = this.physics.add.sprite(272, 210, 'ingredients').setScale(1.2).play('garlic')
    this.ingredients3 = this.physics.add.sprite(64, 778, 'ingredients').setScale(1.2).play('egg')
    this.ingredients4 = this.physics.add.sprite(1400, 240, 'ingredients').setScale(1.2).play('lime')
    this.ingredients5 = this.physics.add.sprite(1520, 1265, 'ingredients').setScale(1.2).play('radish')
    this.ingredients6 = this.physics.add.sprite(654, 614, 'ingredients').setScale(1.2).play('tofu')


    //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');

    this.enemy1 = this.physics.add.sprite(365, 1355, 'enemy').play("enemy-up")
    this.tweens.add({
      targets: this.enemy1,
      y: 1235,
      flipY: false,
      yoyo: true,
      duration: 1800,
      repeat: -1,

      onYoyo: () => {
      console.log('onYoyo, play enemy-up anims');
      this.enemy1.play ("enemy-down")
              
            },
      onRepeat: () => {
      console.log('onRepeat, play enemy-down anims');
      this.enemy1.play ("enemy-up")
        },
    })

    this.enemy2 = this.physics.add.sprite(880, 178, 'enemy').play("enemy-down")
    this.tweens.add({
      targets: this.enemy2,
      y: 290,
      flipY: false,
      yoyo: true,
      duration: 1800,
      repeat: -1,

      onYoyo: () => {
      console.log('onYoyo, play enemy-up anims');
      this.enemy2.play ("enemy-up")
              
            },
      onRepeat: () => {
      console.log('onRepeat, play enemy-down anims');
      this.enemy2.play ("enemy-down")
        },
    })

    this.enemy3 = this.physics.add.sprite(1140, 1350, 'enemy').play("enemy-up")
    this.tweens.add({
      targets: this.enemy3,
      y: 1235,
      flipY: false,
      yoyo: true,
      duration: 1800,
      repeat: -1,

      onYoyo: () => {
      console.log('onYoyo, play enemy-up anims');
      this.enemy3.play ("enemy-down")
              
            },
      onRepeat: () => {
      console.log('onRepeat, play enemy-down anims');
      this.enemy3.play ("enemy-up")
        },
    })

    this.enemy4 = this.physics.add.sprite(470, 732, 'enemy').play("enemy-down")
    this.tweens.add({
      targets: this.enemy4,
      y: 840,
      flipY: false,
      yoyo: true,
      duration: 1800,
      repeat: -1,

      onYoyo: () => {
      console.log('onYoyo, play enemy-up anims');
      this.enemy4.play ("enemy-up")
              
            },
      onRepeat: () => {
      console.log('onRepeat, play enemy-down anims');
      this.enemy4.play ("enemy-down")
        },
    })

    this.enemy5 = this.physics.add.sprite(400, 486, 'enemy').play("enemy-up")
    this.tweens.add({
      targets: this.enemy5,
      y: 368,
      flipY: false,
      yoyo: true,
      duration: 1800,
      repeat: -1,

      onYoyo: () => {
      console.log('onYoyo, play enemy-up anims');
      this.enemy5.play ("enemy-down")
              
            },
      onRepeat: () => {
      console.log('onRepeat, play enemy-down anims');
      this.enemy5.play ("enemy-up")
        },
    })

    this.enemy6 = this.physics.add.sprite(208, 590, 'enemy').play("enemy-right")
    this.tweens.add({
      targets: this.enemy6,
      x: 332,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
        })

    this.enemy7 = this.physics.add.sprite(1008, 1008, 'enemy').play("enemy-left")
    this.tweens.add({
      targets: this.enemy7,
      x: 888,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
        })
      
    this.enemy8 = this.physics.add.sprite(1070, 630, 'enemy').play("enemy-right")
    this.tweens.add({
      targets: this.enemy8,
      x: 1196,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
        })
    
    this.enemy9 = this.physics.add.sprite(1520, 365, 'enemy').play("enemy-left")
    this.tweens.add({
      targets: this.enemy9,
      x: 1400,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
        })

    
    this.physics.add.overlap(this.player, [this.ingredients1, this.ingredients2, this.ingredients3, this.ingredients4, this.ingredients5, this.ingredients6,], this.collectIngredients, null, this);

    this.physics.add.overlap(this.player, [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6, this.enemy7, this.enemy8, this.enemy9], this.hitEnemy, null, this);

    this.treesLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.treesLayer);

    this.stallsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.stallsLayer);

    this.decorLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decorLayer);

    this.ingredientsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.ingredientsLayer);

    this.stallsRoofLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.stallsRoofLayer);

    this.collectSnd = this.sound.add("collect").setVolume(2);
    this.hitSnd = this.sound.add("hitEnemy").setVolume(2);

    this.hearts = [];
for (let i = 0; i < 3; i++) {
    let heart = this.add.image(40 + (i * 36), 30, 'heart')
        .setScrollFactor(0)
        .setDepth(999)
        .setScale(0.035); // adjust scale to taste
    this.hearts.push(heart);
}


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

if(ingredientsCounter >= 6){
  this.Intro3();
  }

  } /////////////////// end of update //////////////////////////////

  collectIngredients(player, ingredients){
      console.log("Player collect Ingredients");

      ingredientsCounter++
      
			// play a sound
      this.collectSnd.play()   

      this.ingredientsText.setText(`${ingredientsCounter}`);


      // disable body
      ingredients.disableBody (true, true);
   }

  hitEnemy(player, enemy){
      console.log("Player hit enemy");
      
      life--

      this.hitSnd.play()
      
			//shake screen
	    this.cameras.main.shake(300);    

      this.player.setTint(0xffffff);

    this.tweens.add({
        targets: this.player,
        alpha: 0,
        duration: 100, 
        ease: 'Linear',
        yoyo: true,
        repeat: 5,
        onComplete: () => {
            this.player.setAlpha(1);
            this.player.clearTint();
        }
    });

      if (this.hearts.length > 0) {
        let lostHeart = this.hearts.pop();
        lostHeart.destroy();
    }

      //disable body
      enemy.disableBody (true, true);

      if(life < 1)
      this.scene.start ("gameOver", {level : 2})

   }


  Intro3() {
    this.scene.start ("Intro3");
   }
  
} //////////// end of class world ////////////////////////
