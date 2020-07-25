
// Globals

/* Complete board with all the numbers */
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

/* Board that is shown on screen */
let sudokuBoard = [];

/* When removing numbers, this variable holds the amount of solutions in the new board */
let numSolutions = 0;

/* Array that holds all the steps in the backtracking algorithm */
let backtracking = [];

/* Colors for the board CSS */
const colors = [
"baby-blue", "teal", "orange", "purple", "yellow", "green", "turquoise", "pink", "blue"
]

/* Holds value of currently clicked cell */
let currentCellId = null;

/* Draws everything to screen */
function start() {
    let body = document.getElementById('start');
    let grid = document.createElement('div');
    grid.classList.add('grid');
    for(let i = 0; i < 3*3; i++) { //creates 10 nested 'div' elements for the grid
        let content = document.createElement('div');
        content.classList.add('grid-block');
        
        for(let j = 0; j < 3*3; j++){
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(colors[i])
            // cell.setAttribute('id', i*9+j);
            // cell.addEventListener('click', cellClicked);
            
            // let textField = document.createElement('p');
            // textField.classList.add('cell-text')
            // textField.setAttribute('id', i + '-' + j);

            // cell.append(textField);
            content.append(cell)
        }
        grid.appendChild(content);
    }
    body.appendChild(grid);

    let bodyInvis = document.getElementsByTagName('BODY')[0];
    let gridInvis = document.createElement('div');
    gridInvis.classList.add('grid');
    gridInvis.classList.add('invis');
    for(let i = 0; i < 9*9; i++) {
        let cellInvis = document.createElement('div');
        cellInvis.classList.add('cell');
        cellInvis.classList.add('invis-cell');
        let textField = document.createElement('p');
        textField.classList.add('cell-text');
        cellInvis.setAttribute('id', i);
        cellInvis.addEventListener('click', cellClicked);
        cellInvis.appendChild(textField);
        gridInvis.appendChild(cellInvis);
    }
    bodyInvis.appendChild(gridInvis);

    let instructions = document.getElementsByClassName('title')[0];
    let btn = document.createElement('BUTTON'); //creates button
    btn.setAttribute("id", "solve");
    btn.addEventListener('click', solveButtonHandler);
    btn.textContent = 'solve';
    instructions.appendChild(btn);

    // Other functions
    generateBoard();
}

/* REMOVE */
function test() {
    console.log("test clicked");
}

/* On click function for cells */
function cellClicked() {
    if(currentCellId != null) {
        document.getElementById(currentCellId).classList.remove('highlighted');
    }
    let id = this.id;
    this.classList.add('highlighted');
    console.log("clicked cell " + id);
    currentCellId = id;
    document.addEventListener('keypress', userInput);
}

/* Handles user input for cells clicked */
function userInput(e) {
    let textField = document.getElementsByTagName('p')[currentCellId];
    console.log("clicked text " + textField.id);
    switch(e.key) {
        case "1":
            textField.innerHTML = e.key;
            break;
        case "2":
            textField.innerHTML = e.key;
            break;
        case "3":
            textField.innerHTML = e.key;
            break;
        case "4":
            textField.innerHTML = e.key;
            break;
        case "5":
            textField.innerHTML = e.key;
            break;
        case "6":
            textField.innerHTML = e.key;
            break;
        case "7":
            textField.innerHTML = e.key;
            break;
        case "8":
            textField.innerHTML = e.key;
            break;
        case "9":
            textField.innerHTML = e.key;
            break;
        default:
    }

}

/* Generates and draws sudoku board to screen */
function generateBoard() {
    // squareTest();
    generateCompleteBoard();
    copyBoard(board, sudokuBoard);
    removeBoardCells();
    drawBoardToScreen();
    // printBoard(board);
}

/* Helper function that copies src into dest */
function copyBoard(src, dest) {
    for(let i = 0; i < src.length; i++) {
        dest.push([]);
        for(let j = 0; j < src[i].length; j++) {
            dest[i].push(src[i][j]);
        }
    }
}

/* REMOVE */
function squareTest() {
    printSquareHTML(copySquare(0, 0, board));
    printSquareHTML(copySquare(0, 3, board));
    printSquareHTML(copySquare(0, 6, board));
}

/* Helper function that makes a copy of a Square in the sudoku board */
function copySquare(row, col, src) {
    let squareRow = 0;
    let squareCol = 0;
    let square = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    for(let i = row; i < row+3; i++) {
        for(let j = col; j < col+3; j++) {
            square[squareRow][squareCol] = src[i][j];
            squareCol += 1;
        }
        squareRow += 1;
        squareCol = 0
    }
    return square;
}

/* Given absolute position, returns row */
function absToRow(position) {
    return Math.floor(position/9);
}

/* Given absolute position, returns column */
function absToCol(position) {
    return position % 9;
}

/* Checks if adding value to row,col conflicts with board */
function conflict(row, col, value, src) {
    let square = [];
    if(row < 3) {
        if(col < 3) {
           square = copySquare(0, 0, src);
        }
        else if(col < 6) {
            square = copySquare(0, 3, src);
        }
        else if(col < 9) {
            square = copySquare(0, 6, src);
        }
    }
    else if(row < 6) {
        if(col < 3) {
            square = copySquare(3, 0, src);
        }
        else if(col < 6) {
            square = copySquare(3, 3, src);
        }
        else if(col < 9) {
            square = copySquare(3, 6, src);
        }
    }
    else if(row < 9) {
        if(col < 3) {
            square = copySquare(6, 0, src);
        }
        else if(col < 6) {
            square = copySquare(6, 3, src);
        }
        else if(col < 9) {
            square = copySquare(6, 6, src);
        }
    }
    
    if(src[row].includes(value)) {
        return true;
    }

    for(let i = 0; i < 9; i++) {
        if(src[i][col] == value) {
            return true;
        }
    }

    for(let m = 0; m < square.length; m++) {
        if(square[m].includes(value)) {
            return true;
        }
    }

    return false;
}

/* REMOVE */
function printCol(row, value) {
    for(let i = 0; i < 9; i++) {
        if(board[row][i] == value)
            console.log(board[row][i]);
    }
}

/* REMOVE */
function printSquare(square) {
    for(let i = 0; i < square.length; i++) {
        for(let j = 0; j < square[0].length; j++) {
            console.log(square[i][j]);
        }
    }
}

/* Generates the complete board with all the numbers */
function generateCompleteBoard() {
    let available = [];
    for(let i = 0; i < 81; i++) {
        let arr = [];
        for(let j = 1; j < 9; j++) {
            arr.push(j);
        }
        available.push(arr);
    }
    let count = 0;
    while(count < 81) {
        let row = absToRow(count);
        let col = absToCol(count);
        if(available[count].length != 0) {
            let rand = Math.floor((Math.random() * available[count].length));
            let value = available[count][rand];
            if(!conflict(row, col, value, board)) {
                // console.log(row + ", " + col + " is now " + value);
                board[row][col] = value;
                available[count].splice(rand, 1);
                count += 1;
            } else {
                available[count].splice(rand, 1);
            }
        } else {
            for(let num = 1; num < 10; num++) {
                available[count].push(num);
            }
            let prevRow = absToRow(count - 1);
            let prevCol = absToCol(count - 1);
            board[prevRow][prevCol] = 0;
            count -= 1;
        }
    }
}

/* Checks if board is completely filled */
function isBoardComplete(src) {
    for(let i = 0; i < src.length; i++) {
        for(let j = 0; j < src.length; j++) {
            if(src[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

/* Finds numver of possible solutions of a sudoku board */
function findNumberOfSolutions(src) {
    if(numSolutions > 1) return true;
    let count = 0;
    let row = 0;
    let col = 0;
    while(count < 81) {
        row = absToRow(count);
        col = absToCol(count);
        if(src[row][col] == 0) {
            for(let val = 1; val < 10; val++) {
                if(!conflict(row, col, val, src)) {
                    src[row][col] = val;
                    if(isBoardComplete(src)) {
                        numSolutions += 1;
                        break;
                    } else {
                        if(findNumberOfSolutions(src)) {
                            return true;
                        }
                    }
                }
            }
            break;
        }
        count++;
    }
    src[row][col] = 0;
}

/* Removes numbers on the board */
function removeBoardCells() {
    let counter = 0;
    let attempts = 2;
    while(attempts > 0) {
        let row = Math.floor((Math.random() * 9));
        let col = Math.floor((Math.random() * 9));
        while(sudokuBoard[row][col] == 0) {
            row = Math.floor((Math.random() * 9));
            col = Math.floor((Math.random() * 9));
        }
        sudokuBoard[row][col] = 0;
        let copyOfBoard = [];
        copyBoard(sudokuBoard, copyOfBoard);
        numSolutions = 0;
        findNumberOfSolutions(copyOfBoard);

        if(numSolutions != 1) {
            sudokuBoard[row][col] = board[row][col];
            attempts -= 1;
        } else {

        }
    }
}

function clearBoardOfUserInput() {
    console.log('STUB: clear board of user input');
}

function highlightSelectedCell(pos) {
    console.log('STUB: highlight selected cell');
}

function writeCell(pos, val) {
    console.log('STUB: write on cell');
}


function solveButtonHandler() {
    solve();
    animateBacktracking();
}

function animateBacktracking() {
    for(let i = 0; i < backtracking.length; i++) {
        setTimeout(() => {
            let node = backtracking[i];
            let cell = document.getElementsByTagName('p')[node.pos];
            if(node.val != 0) {
                cell.innerHTML = node.val;
            } else {
                cell.innerHTML = "";
            }
            console.log(backtracking.length - i);
        }
        ,  30 * i);
    }
}

/* Solves the board */
function solve() {
    let count = 0;
    let row = 0;
    let col = 0;
    while(count < 81) {
        row = absToRow(count);
        col = absToCol(count);
        // highlightSelectedCell(count);
        if(sudokuBoard[row][col] == 0) {
            for(let val = 1; val < 10; val++) {
                if(!conflict(row, col, val, sudokuBoard)) {
                    sudokuBoard[row][col] = val;
                    backtracking.push(new BacktrackingNode(count, val));
                    // writeCell(count, val);
                    if(isBoardComplete(sudokuBoard)) {
                        return true;
                    } else {
                        if(solve(sudokuBoard)) {
                            return true;
                        } else {
                            sudokuBoard[row][col] = 0;
                            backtracking.push(new BacktrackingNode(count, 0));
                        }
                    }
                }
            }
            break;
        }
        count++;
    }
    return false;
}

/* Displays board to screen */
function drawBoardToScreen() {
    let cells = document.getElementsByClassName("invis-cell");
    let cellNumber = 0;
    for(let i = 0; i < sudokuBoard.length; i++) {
        for(let j = 0; j < sudokuBoard[i].length; j++) {
            if(sudokuBoard[i][j] != 0) {
                let id = cells[cellNumber].id;
                let textField = document.getElementsByTagName("P")[id];
                textField.innerHTML = sudokuBoard[i][j];
            }
            cellNumber += 1;
        }
    }
}

/* REMOVE */
function printBoard(src) {
    let body = document.getElementsByTagName("BODY")[0];
    for(let i = 0; i < src.length; i++) {
        let div = document.createElement('div');
        for(let j = 0; j < src[0].length; j++) {
            div.innerHTML += src[i][j] + ' ';
            
        }
        div.innerHTML += '\n';
        body.append(div);
    }
    
}

/* REMOVE */
function printSquareHTML(square) {
    let body = document.getElementsByTagName("BODY")[0];
    for(let i = 0; i < square.length; i++) {
        let div = document.createElement('div');
        for(let j = 0; j < square[0].length; j++) {
            div.innerHTML += square[i][j] + ' ';
            
        }
        div.innerHTML += '\n';
        body.append(div);
    }
    
}

start();