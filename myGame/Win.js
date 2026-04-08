class Win extends Phaser.Scene {

    constructor() {
        super({
            key: 'Win'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("Win", "assets/Win.jpg");
        this.load.audio("winSnd","assets/win.mp3");

    }

    create() {

        console.log('*** Win scene');
        this.add.image(240, 240, 'Win')

        bgMusic.stop();

        this.winSnd = this.sound.add("winSnd");
        this.time.delayedCall(1000, () => this.winSnd.play(), [], this);


        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            bgMusic.play();

            this.scene.start('main',
                // Optional parameters
                {

                }
            );
        }, this);


    }


}