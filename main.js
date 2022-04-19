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
      var elements = this.bars.map(function(bar) { return bar});
      elements.push(this.ball);
      return elements;
    },
  };
})();

//Creación de la clase Ball (model) a partir de función
(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        board.ball = this;
        this.kind="circle"

    }
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
    this.speed = 10;
  };

  self.Bar.prototype = {
    down: function () {
      this.y += this.speed;
    },
    up: function () {
      this.y -= this.speed;
    },
    toString: function () {
      return "x: " + this.x + "y: " + this.y;
    },
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
    clean: function () {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    },

    draw: function () {
      for (let i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx, el);
      }
    },

    play: function () {
      board_view.clean();
      board_view.draw();
    },
  };

  //helper methods
  function draw(ctx, element) {
    switch (element.kind) {
      case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      case "circle":
          ctx.beginPath();
          ctx.arc(element.x,element.y,element.radius,0,7);
          ctx.fill();
          ctx.closePath();
          break;
    }
  }
})();

var board = new self.Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById("canvas");
var board_view = new self.BoardView(canvas, board);
var Ball = new Ball(350, 100, 10, board);

// set movement of the rectangles
document.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (ev.key == "ArrowUp") {
    bar.up();
  } else if (ev.key == "ArrowDown") {
    bar.down();
  } else if (ev.key == "w") {
    bar_2.up();
  } else if (ev.key == "s") {
    bar_2.down();
  }

  console.log(bar.toString());
});

window.requestAnimationFrame(controller);

//declaración de objetos por medio de funciones anónimas
function controller() {
  board_view.play();
  window.requestAnimationFrame(controller);
}
