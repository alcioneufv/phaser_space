class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('bg', 'assets/stars.jpeg');
        this.load.image('ship', 'assets/nave.png');
        this.load.image('mira', 'assets/mira.png');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    }

    create ()
    {
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 1500 * 2, 1000 * 2);
        this.physics.world.setBounds(0, 0, 1500 * 2, 1000 * 2);

        //  Mash 4 images together to create our background
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(1500, 0, 'bg').setOrigin(0).setFlipX(true);
        this.add.image(0, 1000, 'bg').setOrigin(0).setFlipY(true);
        this.add.image(1500, 1000, 'bg').setOrigin(0).setFlipX(true).setFlipY(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.nave = this.physics.add.image(200, 100, 'ship');
        this.player = this.physics.add.image(400, 300, 'mira');


        this.player.setCollideWorldBounds(true);
        this.nave.setCollideWorldBounds(true);
        
        this.particles = this.add.particles('flares');

        this.particles.createEmitter({
            frame: 'green',
            x: 400,
            y: 300,
            lifespan: 5000,
            speedX: { min: -20, max: 20 },
            speedY: { start: 400, end: 600, steps: 12 },
            scale: { start: 0.7, end:  0.2 },
            blendMode: 'ADD',
            on: false
        });

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update ()
    {
        this.player.setVelocity(0);

        let velocidade = Math.floor(Math.random() * 1000) -500;
        let v = Math.random() * 100; 
        if (v <5 ) {
             this.nave.setVelocityY(velocidade);
        } else if (v > 95) {
             this.nave.setVelocityX(velocidade);
        }
        
        if (this.cursors.space.isDown)
        {
            this.particles.emitParticleAt(this.player.x, this.player.y);
        }
    
            
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(500);
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-500);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(500);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
    },
    scene: [ Example ]
};

const game = new Phaser.Game(config);
