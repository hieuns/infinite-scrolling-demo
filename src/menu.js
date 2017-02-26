var Menu = {
  preload: function() {
    game.load.image("startBtn", "assets/start.png");
  },

  create: function() {
    game.stage.backgroundColor = "#71c5cf";
    startButton = game.add.button(game.width/2, game.height/2, "startBtn", this.startGame, this);
    startButton.anchor.setTo(0.5);
  },

  startGame: function() {
    game.state.start("Game");
  }
};
