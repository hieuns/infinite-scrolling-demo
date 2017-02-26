var Game = {
  player: null,
  ground: null,
  obstacles: null,
  current_speed: 200,
  speed_inc_amount: 0.05,
  time_until_spawn: null,
  last_spawn_time: null,

  preload: function() {
    game.load.image("ground", "assets/ground.png");
    game.load.image("player", "assets/player.png");
    game.load.image("obstacle", "assets/obstacle.png");
  },

  create: function() {
    game.stage.backgroundColor = "#71c5cf";

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.ground = game.add.sprite(0, game.world.height - 100, "ground");
    game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    this.player = game.add.sprite(100, game.world.height - 150, "player");
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.obstacles = game.add.group();
    this.obstacles.enableBody = true;

    this.time_until_spawn = Math.random() * 1000 + 1000;
    this.last_spawn_time = game.time.time;

    this.current_speed = 200;
  },

  update: function() {
    this.increaseSpeed();
    game.physics.arcade.collide(this.player, this.ground);
    game.physics.arcade.overlap(this.player, this.obstacles, this.endGame, null, this);

    var current_time = game.time.time;
    if (current_time - this.last_spawn_time > this.time_until_spawn) {
      this.time_until_spawn = Math.random() * 1000 + (1000 - this.current_speed);
      this.last_spawn_time = current_time;
      this.spawnObstacle();
    }
  },

  jump: function() {
    if (this.player.body.touching.down) {
      this.player.body.velocity.y = -500;
    }
  },

  spawnObstacle: function() {
    var obstacle = game.add.sprite(game.world.width, game.world.height - 150, "obstacle");

    this.obstacles.add(obstacle);

    game.physics.arcade.enable(obstacle);
    obstacle.body.velocity.x = -this.current_speed;

    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;
  },

  increaseSpeed: function() {
    if (this.current_speed < 500) {
      this.current_speed += this.speed_inc_amount;
    }
  },

  endGame: function() {
    game.state.start("Menu");
  }
};
