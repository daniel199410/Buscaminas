let spots = document.querySelectorAll('.col');
let board = new Array(10);
let mineSpots = [];
const val = 10;

function addEvents(){
    for(let i = 0; i < 100; i++){
        spots[i].addEventListener("click", () => clickSquare(i));
    }
}

function clickSquare(i){
    console.log(`${i}:[${Math.floor(i / 10)}][${i %  10}]`);
    spots[i].innerHTML = board[Math.floor(i / 10)][i % 10];
    if(spots[i].innerHTML == "x"){
        gameOver();
    }
}

function gameOver(){
    restart();
    alert("Game over");
    repaint();
}

function repaint(){
    spots.forEach(spot => spot.innerHTML = "");
}

function restart(){
    startBoard();
    setMines();
    setNumbers();
}

function startBoard(){
    for(let i = 0; i < board.length; i++){
        board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

function setMines(){
    for(let i = 0; i < val; i++){
        mineSpots[i] = Math.floor(Math.random() * 100)
        let coords = xToxy(i);
        board[coords.row][coords.col] = "x";
    }
}

function setNumbers(){
    for(let i = 0; i < val; i++){
        for(let j = 0; j < val; j++){
            if(board[i][j] == "x"){
                setNeighbours(i, j);
            }
        }
    }
}

function setNeighbours(x, y){
    if(x - 1 >= 0 && y - 1 >= 0 && board[x- 1][y - 1] != "x")
        board[x - 1][y - 1] += 1;
    if(x - 1 >= 0 && board[x- 1][y] != "x")
        board[x - 1][y] += 1;
    if(x - 1 >= 0 && y + 1 < val && board[x- 1][y + 1] != "x")
        board[x - 1][y + 1] += 1;
    if(y - 1 >= 0 && board[x][y - 1] != "x")
        board[x][y - 1] += 1;
    if(y + 1 <= 0 && board[x][y + 1] != "x")
        board[x][y + 1] += 1;
    if(x + 1 < val && y - 1 >= 0 && board[x + 1][y - 1] != "x")
        board[x + 1][y - 1] += 1;
    if(x + 1 < val && board[x + 1][y] != "x")
        board[x + 1][y] += 1;
    if(x + 1 < val && y + 1 < val && board[x + 1][y + 1] != "x")
        board[x + 1][y + 1] += 1;
}

function xToxy(x){
    return {row: Math.floor(mineSpots[x] / 10), col: mineSpots[x] % 10};
}

function start(){
    startBoard();
    setMines();
    setNumbers();
    addEvents();
}

start();