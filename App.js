
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
    let id = this.id;
    console.log("clicked cell " + id);
    let textField = document.getElementsByTagName("P")[id];
    textField.innerHTML = "1";
}

start();