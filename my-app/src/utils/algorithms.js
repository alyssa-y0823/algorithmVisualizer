// Helper function to get valid neighbors
function getNeighbors(node, grid) {
  const neighbors = [];
  const { x, y } = node;
  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0] // right, down, left, up
  ];

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    
    if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
      const neighbor = grid[newY][newX];
      if (!neighbor.iswall) {
        neighbors.push(neighbor);
      }
    }
  }
  
  return neighbors;
}

// Helper function to reconstruct path
function reconstructPath(endNode) {
  const path = [];
  let currentNode = endNode;
  
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  
  return path;
}

// Dijkstra's Algorithm
export function Dijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    // If we encounter a wall, skip it
    if (closestNode.iswall) continue;
    
    // If the closest node is at distance infinity, we're trapped
    if (closestNode.distance === Infinity) return { visitedNodesInOrder, path: [] };
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // If we reached the end, reconstruct path
    if (closestNode === endNode) {
      const path = reconstructPath(endNode);
      return { visitedNodesInOrder, path };
    }
    
    updateUnvisitedNeighbors(closestNode, grid);
  }
  
  return { visitedNodesInOrder, path: [] };
}

// BFS (Breadth-First Search)
export function bfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;
  
  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === endNode) {
      const path = reconstructPath(endNode);
      return { visitedNodesInOrder, path };
    }
    
    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previous = currentNode;
        queue.push(neighbor);
      }
    }
  }
  
  return { visitedNodesInOrder, path: [] };
}

// DFS (Depth-First Search)
export function dfs(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const stack = [startNode];
  
  while (stack.length > 0) {
    const currentNode = stack.pop();
    
    if (currentNode.isVisited) continue;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    if (currentNode === endNode) {
      const path = reconstructPath(endNode);
      return { visitedNodesInOrder, path };
    }
    
    const neighbors = getNeighbors(currentNode, grid);
    // Reverse neighbors to maintain consistent direction preference
    for (const neighbor of neighbors.reverse()) {
      if (!neighbor.isVisited) {
        neighbor.previous = currentNode;
        stack.push(neighbor);
      }
    }
  }
  
  return { visitedNodesInOrder, path: [] };
}

// Helper functions for Dijkstra
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previous = null;
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getNeighbors(node, grid).filter(
    neighbor => !neighbor.isVisited
  );
  
  for (const neighbor of unvisitedNeighbors) {
    const distance = node.distance + neighbor.weight;
    if (distance < neighbor.distance) {
      neighbor.distance = distance;
      neighbor.previous = node;
    }
  }
}

// Animation helper function
export function animateAlgorithm(visitedNodesInOrder, path, callback) {
  // Animate visited nodes
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      // After all visited nodes are animated, animate the path
      setTimeout(() => {
        animatePath(path, callback);
      }, 10 * i);
      return;
    }
    
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      // Add visited class for animation
      node.isAnimatedVisited = true;
      if (callback) callback();
    }, 10 * i);
  }
}

function animatePath(path, callback) {
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      const node = path[i];
      node.isAnimatedPath = true;
      if (callback) callback();
    }, 50 * i);
  }
}