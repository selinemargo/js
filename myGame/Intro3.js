class Intro3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Intro3'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("Intro3", "assets/Intro3.jpg");
        this.load.audio("winSnd","assets/win.mp3");

        bgMusic.stop();

        this.winSnd = this.sound.add("winSnd");
        this.time.delayedCall(1000, () => this.winSnd.play(), [], this);

    }

    create() {

        console.log('*** Intro3 scene');
        this.add.image(240, 240, 'Intro3')


        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            bgMusic.play();

            this.scene.start('level3',
                // Optional parameters
                {

                }
            );
        }, this);


    }


}