
//Creación del objeto Board a partir de función
(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }

})();

//Creación del objeto boardView a partir de función
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

})();


window.addEventListener("load", main);

//declaración de objetos por medio de funciones anónimas
function main(){
    var board = new self.Board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new self.BoardView(canvas, board);

}