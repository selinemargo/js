class gameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameOver'
        });

        // Put global variable here
    }

    init(data) {
        this.level = data.level
    }

    preload() {
        this.load.image("gameOver", "assets/gameOver.jpg");
        this.load.audio("gameOversnd","assets/gameOver.mp3");

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** gameOver scene');
        this.add.image(240, 240, 'gameOver')

        bgMusic.stop();

        this.gameOversnd = this.sound.add("gameOversnd");
        this.time.delayedCall(1000, () => this.gameOversnd.play(), [], this);

        life = 3
        cowCounter = 0
        ingredientsCounter = 0
        chilliCounter = 0

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Restarting the bgMusic',this.level);
            
            bgMusic.play();

            if(this.level==1) {
                 this.scene.start('level1');
            } else if (this.level==2) {
                 this.scene.start('level2');
            } else if (this.level==3) {
                 this.scene.start('level3');
            }
                }, this);

    }


}