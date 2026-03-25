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

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** gameOver scene');
        this.add.image(240, 240, 'gameOver')

        life = 3
        cowCounter = 0

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        //this.add.image(0, 0, 'main').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to level',this.level);

            if(this.level==1) {
                 this.scene.start('level1');
            } else if (this.level==2) {
                 this.scene.start('level2');
            } else if (this.level==3) {
                 this.scene.start('level3');
            }
                }, this);


        // Add any text in the main page
        this.add.text(90, 600, 'Press spacebar to continue', {
            font: '30px Courier',
            fill: '#FFFFFF'
        });


        // Create all the game animations here

    }


}