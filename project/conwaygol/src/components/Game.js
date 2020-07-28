import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import '../styles/Game.css'

const numRows = 32;
const numCols = 32;

const operations = [
    [0,1],
    [0,-1],
    [1,-1],
    [-1,1],
    [1,1],
    [-1,-1],
    [1,0],
    [-1,0]
]

const clearGrid = () => {
    const rows = [];
    for (let i = 0;i<numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows;   
}

function Game() {
    const [running,setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const [grid, setGrid] = useState(() =>{
        return clearGrid();
    });
    
    const gameStart = useCallback(() => {
        if (!runningRef.current) {
          return;
        }

    const fillBox = () => {

    }
    

        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++){
                        let nb = 0;
                        operations.forEach(([x,y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols){
                                nb += g[newI][newJ];
                            }
                        })
                        
                        if(nb < 2 || nb > 3){
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && nb === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        })
        
        setTimeout(gameStart,100);
    },[])


  return (
      <>
      <button 
        onClick={() => {
            setRunning(!running);
            if (!running) {
            runningRef.current = true;
            gameStart();
            }
            }}>
                {running ? 'stop' : 'start'}
      </button>
      <button
        onClick={() => {
            const rows = [];
            for (let i = 0;i<numRows; i++){
                rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)))
            }
        
            setGrid(rows);  
        }}
      >Randomize</button>
      <button
        onClick={() => {
            setGrid(clearGrid());
        }}
      >Clear</button>
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}>
      {grid.map((rows,i) => 
        rows.map((col,k) => 
        <div 
        className='box'
        key={`${i}-${k}`} 
        onMouseDown={() => { if(!running){
            const newGrid = produce(grid,gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
            })
            setGrid(newGrid)
        }
        }}
        style={{
            backgroundColor: grid[i][k] ? 'black' : undefined}} />))}
    </div>
    </>
  );
}

export default Game;
