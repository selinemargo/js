class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("Start", "assets/Main.jpg");
        this.load.audio("bgMusic","assets/bgAudio.mp3");
    }

    create() {

        console.log('*** main scene');
        this.add.image(240, 240, 'Start')

    
        // turn on loop, adjust the volume
        bgMusic = this.sound.add("bgMusic",{loop: true}).setVolume(0.5);
        // start the background musicc
        bgMusic.play();


        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            this.scene.start('story',
                // Optional parameters
                {

                }
            );
        }, this);

    }


}