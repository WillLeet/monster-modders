import Player from "../sprites/Player.js"

export default class Prototype extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.player = null
        this.otherPlayers = {}
      }

      init(data){
          this.socket = data.socket;
      }

      preload(){
        //Loads basic ssets
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
        );
      }

      create(){
        //Initializes player
        //const self = this
        this.add.image(400, 300, 'sky');
        const playerId = this.socket.id
        this.socket.on('currentPlayers', function (players, id = playerId) {
            console.log("Players object: ",players)
            console.log("ID: ",id);
            /*
            Object.keys(players).forEach(function (id) {
              if (players[id].playerId === this.socket.id) {
                console.log(players[id].playerId);
                console.log("Creating new player at coords: ",players[id].x,players[id].y);
              } else {
                  console.log("Adding another player");
              }
            });
            */
          });
        //this.player = new Player(this.socket.x,this.socket.y,'dude',this.socket);
        //Makes player bound to world
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setCollideWorldBounds(true);
        console.log("Socket: ",this.socket);


        //Sets up controls
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        //Implements animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

      update (){
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-190);
            this.player.anims.play('left', true);
        }

        else if (this.cursors.right.isDown){
            this.player.setVelocityX(190);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-330);
        }
    }

    addPlayer(){

    }

    addOtherPlayers(){

    }
}
