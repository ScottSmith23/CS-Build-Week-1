import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import '../styles/Game.css'


function Game() {

    const [running,setRunning] = useState(false);
    const runningRef = useRef(running);
    const [gridSize,setGridSize] = useState({numRows:25,numCols:25})
    const [genCount,setGenCount] = useState(0)
    runningRef.current = running;
    let count = 0;

    //Clears the Grid
    const clearGrid = () => {
        setGenCount(0)
        const rows = [];
 
        for (let i = 0;i<gridSize.numRows; i++){
            rows.push(Array.from(Array(gridSize.numCols), () => 0))

        }
        
        return rows;   

    }

    const [grid, setGrid] = useState(() =>{
        return clearGrid();
    });

    //Clears orange tiles
    const clearUsed = () => {
        
        const clearUsed = document.querySelectorAll(".box")
        
        for (let i = 0;i<clearUsed.length; i++){
            clearUsed[i].classList.remove("used")
    
        }
            
        }

    //fills a box at i,k coords
    const fillBox = (i,k) => {
        if(!running){
            const newGrid = produce(grid,gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
            })
            setGrid(newGrid)
        }
        let used = document.getElementsByClassName(`${i}-${k}`)[0]
            used.classList.add("used")
        
    }
    //play+pause
    const playPause = () => {

        setRunning(!running);
        if (!running) {
        runningRef.current = true;
        gameStart();
        }
        
        
    }

    //randomize
    const randGen = () => {
        const rows = [];
        for (let i = 0;i<gridSize.numRows; i++){
            rows.push(Array.from(Array(gridSize.numCols), () => (Math.random() > 0.8 ? 1 : 0)))
        }
    
        setGrid(rows);  
    }

    //changeSize
    const changeGrid = (newRow,newCol) => {
        setRunning(false);
        setGrid(clearGrid());
        clearUsed();
        setGridSize({numRows:newRow,numCols:newCol});
        
    }


    //gamerunning logic
    const gameStart = useCallback(() => {
        if (!runningRef.current) {
          return;
        }

        const ops = [[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1],[1,0],[-1,0]]

        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < gridSize.numRows; i++) {
                    for (let j = 0; j < gridSize.numCols; j++){
                        let nb = 0;
                        ops.forEach(([x,y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < gridSize.numRows && newJ >= 0 && newJ < gridSize.numCols){
                                nb += g[newI][newJ];
                            }
                        })
                        
                        if(nb < 2 || nb > 3){
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && nb === 3) {
                            gridCopy[i][j] = 1;
                            let used = document.getElementsByClassName(`${i}-${j}`)[0]
                            used.classList.add("used")
                        }
                    }
                }
            })
        })
        count = count + 1
        setGenCount(count + 1)
        setTimeout(gameStart,100);
    },[gridSize])


  return (
      <>
            <div>
    <p>Generations: {`${genCount}`}</p>
      </div>
    <div className="gameGrid">
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.numCols}, 20px)`
    }}>
      {grid.map((rows,i) => 
        rows.map((col,k) => 
        <div 
        className={`box ${i}-${k}`}
        key={`${i}-${k}`} 
        onMouseDown={()=> {fillBox(i,k)}}
        style={{
            backgroundColor: grid[i][k] ? 'black' : undefined}} />))}
    </div>
    </div>
    <div className="buttonDiv">
    <button onClick={() => {playPause()}}>
                {running ? 'stop' : 'start'}
    </button>
    <button onClick={() => {randGen()}}
      >Randomize
    </button>
    <button onClick={() => {
            setGrid(clearGrid());
            clearUsed();
        }}
      >Clear
    </button>
    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    <Dropdown.Item onClick={() => {changeGrid(25,25)}}>25x25</Dropdown.Item>
    <Dropdown.Item onClick={() => {changeGrid(32,32)}}>32x32</Dropdown.Item>
    <Dropdown.Item onClick={() => {changeGrid(48,48)}}>48x48</Dropdown.Item>
    </DropdownButton>
      </div>
    </>
  );
}

export default Game;
