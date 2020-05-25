import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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

function cellClicked() {
  console.log("hello");
}

class App extends Component {

  createTable() {
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
          
          let textField = document.createElement('p');
          textField.classList.add('cell-text')
          textField.setAttribute('id', i + '-' + j);
          textField.onclick = cellClicked;

          cell.append(textField);
          content.append(cell)
        }
        grid.appendChild(content);
    }
    body.appendChild(grid);
  }
  
  render() {
    return (
      <p>
        <div className="App">
          <body>
              {
                this.createTable()
              }
          </body>
        </div>
      </p>
    );
  }
}

export default App;
