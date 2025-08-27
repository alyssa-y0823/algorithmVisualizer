import { useContext, useState, createContext, useEffect, useRef } from "react";
import getGrid from "../utils/startingGrid.js";
import { dijkstra, bfs, dfs, animateAlgorithm } from "../utils/algorithms.js";

const context = createContext()

export const useParams = () => {
    return useContext(context)
}

export const ParamsProvider = ({ children }) => {
    const [mode, setmode] = useState(null)
    const [algo, setalgo] = useState('')
    const [run, setrun] = useState(false)
    const [grid, setgrid] = useState(getGrid(50, 25))
    const [editing, seteditFlag] = useState(false)
    const [res, setres] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const start = useRef({ x: 25, y: 12 })
    const end = useRef({ x: 48, y: 23 })

    useEffect(() => {
        restart()
    }, [res])

    useEffect(() => {
        if (run && algo && !isRunning) {
            runAlgorithm()
        }
    }, [run])

    function restart() {
        const newGrid = getGrid(50, 25)
        
        // Reset start and end positions to match the new grid's defaults
        start.current = { x: 25, y: 12 }
        end.current = { x: 48, y: 23 }
        
        // Clear all animation and algorithm states
        newGrid.forEach(row => {
            row.forEach(cell => {
                cell.isVisited = false
                cell.isAnimatedVisited = false
                cell.isAnimatedPath = false
                cell.distance = Infinity
                cell.previous = null
            })
        })
        
        setgrid(newGrid)
        setIsRunning(false)
        setrun(false)
        setmode(null) // Clear any active mode
        
        // Force a re-render to ensure UI updates
        setTimeout(() => {
            setgrid([...newGrid])
        }, 0)
    }

    function runAlgorithm() {
        if (!algo || isRunning) return
        
        setIsRunning(true)
        seteditFlag(true) // Disable editing during animation
        
        // Get start and end nodes from the grid
        const startNode = grid[start.current.y][start.current.x]
        const endNode = grid[end.current.y][end.current.x]
        
        let result
        
        // Create a deep copy of grid for algorithm
        const gridCopy = grid.map(row => 
            row.map(cell => ({ 
                ...cell,
                isVisited: false,
                isAnimatedVisited: false,
                isAnimatedPath: false,
                distance: Infinity,
                previous: null
            }))
        )
        const startNodeCopy = gridCopy[start.current.y][start.current.x]
        const endNodeCopy = gridCopy[end.current.y][end.current.x]
        
        // Run selected algorithm
        switch (algo) {
            case 'dijkstra':
                result = dijkstra(gridCopy, startNodeCopy, endNodeCopy)
                break
            case 'BFS':
                result = bfs(gridCopy, startNodeCopy, endNodeCopy)
                break
            case 'DFS':
                result = dfs(gridCopy, startNodeCopy, endNodeCopy)
                break
            default:
                setIsRunning(false)
                seteditFlag(false)
                return
        }
        
        // Map the result back to original grid coordinates and clear previous animations
        const updatedGrid = grid.map(row => 
            row.map(cell => ({
                ...cell,
                isAnimatedVisited: false,
                isAnimatedPath: false
            }))
        )
        
        const visitedNodesInOrder = result.visitedNodesInOrder.map(node => 
            updatedGrid[node.y][node.x]
        )
        const path = result.path.map(node => 
            updatedGrid[node.y][node.x]
        )
        
        setgrid(updatedGrid)
        
        // Animate the algorithm
        animateAlgorithm(visitedNodesInOrder, path, () => {
            setgrid(current => [...current]) // Force re-render with current state
        })
        
        // Re-enable editing after animation
        setTimeout(() => {
            setIsRunning(false)
            seteditFlag(false)
            setrun(false)
        }, (visitedNodesInOrder.length * 10) + (path.length * 50) + 1000)
    }

    return (
        <div>
            <context.Provider value={{
                mode,
                setmode,
                algo,
                setalgo,
                grid,
                setgrid,
                setres,
                editing,
                seteditFlag,
                start,
                end,
                run,
                setrun,
                res,
                isRunning
            }}>
                {children}
            </context.Provider>
        </div>
    )
}