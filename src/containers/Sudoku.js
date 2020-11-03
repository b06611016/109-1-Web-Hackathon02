import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactLoading from "react-loading";
import { Fireworks } from 'fireworks/lib/react'

import "./Sudoku.css"
import Header from '../components/Header';
import Grid_9x9 from '../components/Grid_9x9';
import ScreenInputKeyBoard from '../components/ScreenInputKeyBoard'
import { problemList } from "../problems"

function Sudoku() {
            const [loading, setLoading] = useState(true); // Return loading effect if this is true.
            const [problem, setProblem] = useState(null); // Stores problem data. See "../problems/" for more information.This is the origin problem and should not be modified. This is used to distinguish the fixed numbers from the editable values
            const [gridValues, setGridValues] = useState(null)  // A 2D array storing the current values on the gameboard. You should update this when updating the game board values.
            const [selectedGrid, setSelectedGrid] = useState({ row_index: -1, col_index: -1 });// This objecct store the current selected grid position. Update this when a new grid is selected.
            const [gameBoardBorderStyle, setGameBoardBorderStyle] = useState("8px solid #000") // This stores the gameBoarderStyle and is passed to the gameboard div. Update this to have a error effect (Bonus #2).
            const [completeFlag, setCompleteFlag] = useState(false); // Set this flag to true when you wnat to set off the firework effect.
            const [conflicts, setConflicts] = useState([{ row_index: -1, col_index: -1 }]); // The array stores all the conflicts positions triggered at this moment. Update the array whenever you needed

    const handle_grid_1x1_click = (row_index, col_index) => {
        // TODO

        //Useful hints:
        console.log(row_index, col_index);
        console.log(selectedGrid);
	let row = row_index;
	let col = col_index;
	setSelectedGrid( {row_index: row, col_index: col} )
    }

    const handleKeyDownEvent = (event) => {
        // TODO

        // Useful hints:
        console.log(event);
	console.log("gridValues: " + gridValues);
        if (gridValues !== null && selectedGrid.row_index !== -1 && selectedGrid.col_index !== -1 && (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
		let grid = gridValues;
		console.log(selectedGrid.row_index);
		console.log(selectedGrid.col_index);
		//console.log("grid: " + grid);
		//console.log(grid[selectedGrid.row_index][selectedGrid.col_index]);
		//grid[selectedGrid.row_index][selectedGrid.col_index] = event.key;
		//console.log(grid[selectedGrid.row_index][selectedGrid.col_index]);
		//setGridValues(grid);
	}

		//setProblem(problem.content[selectedGrid.row_index][selectedGrid.col_index] === "0"));
    }

    const handleScreenKeyboardInput = (num) => {
        // TODO
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDownEvent);
    });

    const loadProblem = async (name) => {
            setLoading(true);
            setProblem(null);
            setGridValues(null);
            setSelectedGrid({ row_index: -1, col_index: -1 });

        const problem = await require(`../problems/${name}`)
        if (problem.content !== undefined) {
            let gridValues = [];
            for (let i = 0; i < problem.content.length; i++)
                gridValues[i] = problem.content[i].slice();
            setProblem(problem);
	    setGridValues(gridValues); 
	    setLoading(false);
        }
    }

    function extractArray(array, col_index, row_index) {
        let rt = []
        for (let i = row_index; i < row_index + 3; i++) {
            for (let j = col_index; j < col_index + 3; j++) {
                rt.push(array[i][j])
            }
        }
        return rt;
    }

 
     const fxProps = {
            count: 3,
            interval: 700,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            colors: ['#cc3333', '#81C784'],
            calc: (props, i) => ({
                ...props,
                x: (i + 1) * (window.innerWidth / 3) * Math.random(),
                y: window.innerHeight * Math.random()
            })
        };
        return (
            <>
                <Header problemList={problemList} loadProblem={loadProblem} gridValues={gridValues} problem={problem} />
                {loading ? (<ReactLoading type={"bars"} color={"#777"} height={"40vh"} width={"40vh"} />) : (
                    <div id="game-board" className="gameBoard" style={{ border: gameBoardBorderStyle }}>
                        <div className="row">
                            <Grid_9x9 row_offset={0} col_offset={0}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 0, 0)}
                                fixedValue={extractArray(problem.content, 0, 0)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={3}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 3, 0)}
                                fixedValue={extractArray(problem.content, 3, 0)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={6}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 6, 0)}
                                fixedValue={extractArray(problem.content, 6, 0)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={3} col_offset={0}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 0, 3)}
                                fixedValue={extractArray(problem.content, 0, 3)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={3}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 3, 3)}
                                fixedValue={extractArray(problem.content, 3, 3)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={6}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 6, 3)}
                                fixedValue={extractArray(problem.content, 6, 3)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={6} col_offset={0}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 0, 6)}
                                fixedValue={extractArray(problem.content, 0, 6)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={3}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 3, 6)}
                                fixedValue={extractArray(problem.content, 3, 6)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={6}
                                handle_grid_1x1_click={handle_grid_1x1_click}
                                value={extractArray(gridValues, 6, 6)}
                                fixedValue={extractArray(problem.content, 6, 6)}
                                selectedGrid={selectedGrid}
                                conflicts={conflicts} />
                        </div>
                    </div>
                )}
                {completeFlag ? (<Fireworks {...fxProps} />) : null}
                {loading ? null : (<ScreenInputKeyBoard handleScreenKeyboardInput={handleScreenKeyboardInput} />)}
            </>
        );
}

export default Sudoku;
