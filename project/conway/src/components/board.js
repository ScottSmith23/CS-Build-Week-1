import React, { useState } from 'react'
import '../styles/board.css'

const CELL_SIZE = 10;
const WIDTH = 800;
const HEIGHT = 600;

function Game() {
    const [cells,setCells] = useState([])
    const [board,setBoard] = useState([])

    const makeBoard = () => {
        let board = [];
        for (let y = 0; y < this.rows; y++){
            board[y] = [];      
            for (let x = 0; x < this.cols; x++) {        
            board[y][x] = false;     
            }    
            }    
            setBoard(board);    
     }
     
    const makeCells = () => {
    let cells = [];    
    for (let y = 0; y < this.rows; y++) {      
        for (let x = 0; x < this.cols; x++) {        
            if (this.board[y][x]) {          
                cells.push({ x, y });        
            }      }    }    setCells(cells);  } 
    
    const handleClick = () =>{



    }

    
     

    return (      
    <div>        
        <div className="Board"
        style={{ width: WIDTH, 
                height: HEIGHT,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
        onClick={handleClick}       
                >
        

        </div>      
    </div>    );
  }

  export default Game;
