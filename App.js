
// Globals
let sudoku = [
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

const colors = [
"baby-blue", "teal", "orange", "purple", "yellow", "green", "turquoise", "pink", "blue"
]

let currentCellId = null;

function start() {
    console.log("here in app.js");
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

start();