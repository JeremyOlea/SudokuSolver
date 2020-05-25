import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const colors = [
  "baby-blue", "teal", "orange", "purple", "yellow", "green", "turquoise", "pink", "blue"
]

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
          content.append(cell)
        }
        grid.appendChild(content);
    }
    body.appendChild(grid);
  }
  
  render() {
    return (
      <div className="App">
        <body>
            {
              this.createTable()
            }
        </body>
      </div>
    );
  }
}

export default App;
