//Creación de la clase Board (model) a partir de función
(function () {
  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
  };

  self.Board.prototype = {
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    },
  };
})();

//Creación de la clase Bar (model) a partir de función
(function () {
  self.Bar = function (x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    //the tpe of the shape
    this.kind = "rectangle";
  };

  self.Bar.prototype = {
    down: function () {},
    up: function () {},
  };
})();

//Creación de la clase boardView (view) a partir de función
(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  };

  self.BoardView.prototype = {
    draw: function () {
      for (let i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx, el);
      }
    },
  };

  //helper methods
  function draw(ctx, element) {
    if (element !== null && element.hasOwnProperty("kind")) {
      switch (element.kind) {
        case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
      }
    }
  }
})();

window.addEventListener("load", main);

//declaración de objetos por medio de funciones anónimas
function main() {
  var board = new self.Board(800, 400);
  var bar = new Bar(20,100,40,100,board);
  var bar = new Bar(735,100,40,100,board);
  var canvas = document.getElementById("canvas");
  var board_view = new self.BoardView(canvas, board);

  board_view.draw();
}
