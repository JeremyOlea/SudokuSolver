
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

let sudokuNumbers = [1,2,3,4,5,6,7,8,9];

const colors = [
"baby-blue", "teal", "orange", "purple", "yellow", "green", "turquoise", "pink", "blue"
]

let currentCellId = null;

function start() {
    let body = document.getElementsByTagName("BODY")[0];
    let grid = document.createElement('div');
    grid.classList.add('grid');
    for(let i = 0; i < 3*3; i++) { //creates 10 nested 'div' elements for the grid
        let content = document.createElement('div');
        content.classList.add('grid-block');
        
        for(let j = 0; j < 3*3; j++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add(colors[i])
        cell.setAttribute('id', i*9+j);
        cell.addEventListener('click', cellClicked);
        
        let textField = document.createElement('p');
        textField.classList.add('cell-text')
        textField.setAttribute('id', i + '-' + j);

        cell.append(textField);
        content.append(cell)

        }
        grid.appendChild(content);
    }
    body.appendChild(grid);

    // Other functions
    // printBoard();
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
    let textField = document.getElementsByTagName("P")[currentCellId];
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
    generateCompleteBoard();
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
        }
    }
    return square;
}

function getSquare(row, col) {
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
    return square;
}

function generateCompleteBoard() {
    for(let i = 0; i < 81; i++) {
        let row = Math.floor(i/9);
        let col = i % 9;

        if(board[row][col] == 0) {
            shuffle(sudokuNumbers);
            for(let j = 0; j < sudokuNumbers.length; i++) {
                let value = sudokuNumbers[j];
                if(!board[row].includes(value)) {
                    if(!board[row][0].includes(value) ||
                    !board[row][1].includes(value) || 
                    !board[row][2].includes(value) ||
                    !board[row][3].includes(value) ||
                    !board[row][4].includes(value) ||
                    !board[row][5].includes(value) ||
                    !board[row][6].includes(value) ||
                    !board[row][7].includes(value) ||
                    !board[row][8].includes(value)) 
                    {
                        let square = getSquare(row, col);
                        for(let m = 0; m < square.length; m++) {
                            if(!square[m].includes(value)) {
                                board[row][col] = value;
                            }
                        }
                    }
                }
            }
        }
    }
}

function printBoard() {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[0].length; j++) {
            console.log(board[i][j]);
        }
    }
}

start();