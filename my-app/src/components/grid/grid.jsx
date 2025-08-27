import React from 'react';
import { useParams } from '../../context/context';
import Cell from '../Cell/Cell';
import './Grid.css';

const Grid = () => {
  const { grid, mode, setgrid, start, end } = useParams();

  const handleCellClick = (x, y) => {
    if (!mode) return;

    const newGrid = grid.map(row => [...row]); // Create deep copy
    const cell = newGrid[y][x];

    switch (mode) {
      case 'setstart':
        // Clear previous start cell
        newGrid.forEach(row => {
          row.forEach(c => c.isstart = false);
        });
        cell.isstart = true;
        cell.iswall = false; // Can't be a wall and start
        start.current = { x, y };
        break;

      case 'settarget':
        // Clear previous target cell
        newGrid.forEach(row => {
          row.forEach(c => c.istarget = false);
        });
        cell.istarget = true;
        cell.iswall = false; // Can't be a wall and target
        end.current = { x, y };
        break;

      case 'addbricks':
        if (!cell.isstart && !cell.istarget) {
          cell.iswall = !cell.iswall;
          if (cell.iswall) {
            cell.weight = 1; // Reset weight if making it a wall
          }
        }
        break;

      case 'addweight':
        if (!cell.isstart && !cell.istarget && !cell.iswall) {
          cell.weight = cell.weight === 1 ? 3 : 1;
        }
        break;

      default:
        return; // Unknown mode, don't update
    }

    setgrid(newGrid);
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, y) => (
          <div key={y} className="grid-row">
            {row.map((cell, x) => (
              <Cell 
                key={`${x}-${y}`}
                cell={cell}
                x={x}
                y={y}
                onClick={() => handleCellClick(x, y)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;