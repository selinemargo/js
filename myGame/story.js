class story extends Phaser.Scene {

    constructor() {
        super({
            key: 'story'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("Story", "assets/story.jpg");
    }

    create() {

        console.log('*** story scene');
        this.add.image(240, 240, 'Story')


        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            this.scene.start('Instruction',
                // Optional parameters
                {

                }
            );
        }, this);


    }


}