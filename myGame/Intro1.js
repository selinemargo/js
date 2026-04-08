class Intro1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Intro1'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("Intro1", "assets/Intro1.jpg");
    }

    create() {

        console.log('*** Intro1 scene');
        this.add.image(240, 240, 'Intro1')


        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            this.scene.start('level1',
                // Optional parameters
                {

                }
            );
        }, this);

    }


}