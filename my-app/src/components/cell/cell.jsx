import React from 'react';
import './Cell.css';

const Cell = ({ cell, x, y, onClick }) => {
  const getCellClass = () => {
    let classes = ['cell'];
    
    // Algorithm animation states take precedence (but preserve start/target)
    if (cell.isAnimatedPath && !cell.isstart && !cell.istarget) {
      classes.push('path-cell');
    } else if (cell.isAnimatedVisited && !cell.isstart && !cell.istarget) {
      classes.push('visited-cell');
    }
    
    // Regular cell states
    if (cell.isstart) classes.push('start-cell');
    else if (cell.istarget) classes.push('target-cell');
    else if (cell.iswall) classes.push('wall-cell');
    else if (cell.weight > 1) classes.push('weight-cell');
    else classes.push('empty-cell');
    
    return classes.join(' ');
  };

  const renderCellContent = () => {
    // Always show start/target icons even during animation
    if (cell.isstart) {
      return <i className="bi bi-geo-alt"></i>;
    }
    if (cell.istarget) {
      return <i className="bi bi-geo"></i>;
    }
    if (cell.weight > 1 && !cell.iswall) {
      return <span className="weight-text">{cell.weight}</span>;
    }
    if (cell.iswall) {
      return <i className="bi bi-bricks"></i>;
    }
    return null;
  };

  return (
    <div 
      className={getCellClass()}
      onClick={onClick}
      data-x={x}
      data-y={y}
    >
      {renderCellContent()}
    </div>
  );
};

export default Cell;