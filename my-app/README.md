# Path-Finding Algorithm Visualizer

A React-based application for visualizing graph traversal and pathfinding algorithms. Interactive tool demonstrating how BFS, DFS, and Dijkstra's algorithm explore search spaces and find optimal paths on a weighted grid.

## Features

- **Algorithm Visualization**: BFS, DFS, and Dijkstra's algorithm with real-time execution
- **Interactive Grid**: 50×25 grid with drag-to-edit walls and weighted nodes
- **Custom Scenarios**: Create obstacles and weighted paths for realistic pathfinding

## Installation

**Prerequisites**: Node.js 16+, npm 8+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173
```

## Usage

1. **Setup Grid**: Use toolbar to set start/end points, add walls, or weighted nodes
2. **Select Algorithm**: Choose BFS (shortest path), DFS (depth-first), or Dijkstra (weighted shortest path)
3. **Run Visualization**: Click play to watch the algorithm find the optimal path
4. **Reset**: Clear results and modify grid as needed

## Algorithm Overview

| Algorithm | Purpose | Complexity | Best For |
|-----------|---------|------------|----------|
| **BFS** | Shortest path (unweighted) | O(V + E) | Equal-cost scenarios |
| **DFS** | Depth-first exploration | O(V + E) | Traversal demonstration |
| **Dijkstra** | Shortest path (weighted) | O(V²) | Realistic pathfinding |

## Technical Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3, Bootstrap 5
- **State**: React Context API
- **Animation**: CSS transitions with React refs

## Project Structure

```
src/
├── components/
│   ├── Navbar/          # Controls and algorithm selection
│   └── Grid/            # Grid rendering and algorithms
├── contexts/            # State management
└── utils/               # Grid utilities
```

## Development

```bash
npm run dev      # Development server
npm run build    # Production build  
npm run lint     # Code analysis
```

## Acknowledgements

Original tutorial and implementation guidance from freeCodeCamp