var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 15,
    height: 32 * 15,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, story, Instruction, gameOver, Win, Intro1, level1, Intro2, level2, Intro3, level3]
};

var game = new Phaser.Game(config);

let life = 3
let cowCounter = 0
let ingredientsCounter = 0
let chilliCounter = 0


let bgMusic