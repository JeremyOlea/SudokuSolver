
// Globals
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

let sudokuNumbers = [1,2,3,4,5,6,7,8,9];

const colors = [
"baby-blue", "teal", "orange", "purple", "yellow", "green", "turquoise", "pink", "blue"
]

let currentCellId = null;

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

    // Other functions
    generateBoard();
}

function test() {
    console.log("test clicked");
}

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

function generateBoard() {
    // squareTest();
    generateCompleteBoard();
}

function squareTest() {
    printSquareHTML(copySquare(0, 0));
    printSquareHTML(copySquare(0, 3));
    printSquareHTML(copySquare(0, 6));
}

function copySquare(row, col) {
    let squareRow = 0;
    let squareCol = 0;
    let square = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    for(let i = row; i < row+3; i++) {
        for(let j = col; j < col+3; j++) {
            square[squareRow][squareCol] = board[i][j];
            squareCol += 1;
        }
        squareRow += 1;
        squareCol = 0
    }
    return square;
}

function absToRow(position) {
    return Math.floor(position/9);
}

function absToCol(position) {
    return position % 9;
}

function conflict(row, col, value) {
    let square = [];
    if(row < 3) {
        if(col < 3) {
           square = copySquare(0, 0);
        }
        else if(col < 6) {
            square = copySquare(0, 3);
        }
        else if(col < 9) {
            square = copySquare(0, 6);
        }
    }
    else if(row < 6) {
        if(col < 3) {
            square = copySquare(3, 0);
        }
        else if(col < 6) {
            square = copySquare(3, 3);
        }
        else if(col < 9) {
            square = copySquare(3, 6);
        }
    }
    else if(row < 9) {
        if(col < 3) {
            square = copySquare(6, 0);
        }
        else if(col < 6) {
            square = copySquare(6, 3);
        }
        else if(col < 9) {
            square = copySquare(6, 6);
        }
    }
    
    if(board[row].includes(value)) {
        return true;
    }

    for(let i = 0; i < 9; i++) {
        if(board[i][col] == value) {
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

function printCol(row, value) {
    for(let i = 0; i < 9; i++) {
        if(board[row][i] == value)
            console.log(board[row][i]);
    }
}

function printSquare(square) {
    for(let i = 0; i < square.length; i++) {
        for(let j = 0; j < square[0].length; j++) {
            console.log(square[i][j]);
        }
    }
}

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
            if(!conflict(row, col, value)) {
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
    drawBoardToScreen();
    // printBoard();
}

function drawBoardToScreen() {
    let cells = document.getElementsByClassName("invis-cell");
    let cellNumber = 0;
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            let id = cells[cellNumber].id;
            let textField = document.getElementsByTagName("P")[id];
            textField.innerHTML = board[i][j];
            cellNumber += 1;
        }
    }
}

function printBoard() {
    let body = document.getElementsByTagName("BODY")[0];
    for(let i = 0; i < board.length; i++) {
        let div = document.createElement('div');
        for(let j = 0; j < board[0].length; j++) {
            div.innerHTML += board[i][j] + ' ';
            
        }
        div.innerHTML += '\n';
        body.append(div);
    }
    
}

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