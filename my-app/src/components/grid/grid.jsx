import React, { useState, useEffect, useRef } from 'react'
import './Grid.css'
import { useParams } from '../../contexts/context'

export default function Grid() {
  const { grid, setgrid, editing, seteditFlag, mode, start, end, run, res, algo } = useParams()
  const [refarray, mm] = useState(getrefarray(grid))

  function getrefarray(grid) {
    let array = []
    grid.forEach((elem) => {
      elem.forEach((child) => {
        array.push(useRef())
      })
    })
    return array
  }

  function BFS(graph, hashmap, prevmap, start, target) {
    let queue = [start]
    let count = 0
    hashmap[`${start.x}-${start.y}`] = true
    
    while (queue.length > 0) {
      count += 1
      let c = queue.pop()
      refarray[c.x + c.y * 50].current.style['transition-delay'] = `${count * 8}ms`
      refarray[c.x + c.y * 50].current.classList.add('visited')
      
      if (c.x === target.x && c.y === target.y) return [c, count]

      if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y })
        prevmap[`${c.x + 1}-${c.y}`] = { ...c }
        hashmap[`${c.x + 1}-${c.y}`] = true
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y })
        prevmap[`${c.x - 1}-${c.y}`] = { ...c }
        hashmap[`${c.x - 1}-${c.y}`] = true
      }
      if (c.y + 1 < 25 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y + 1 })
        prevmap[`${c.x}-${c.y + 1}`] = { ...c }
        hashmap[`${c.x}-${c.y + 1}`] = true
      }
      if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y - 1 })
        prevmap[`${c.x}-${c.y - 1}`] = { ...c }
        hashmap[`${c.x}-${c.y - 1}`] = true
      }
    }
    return null
  }

  function DFS(graph, hashmap, prevmap, start, target) {
    let queue = [start]
    let count = 0
    hashmap[`${start.x}-${start.y}`] = true
    
    while (queue.length > 0) {
      count += 1
      let c = queue[0]
      queue.shift()
      refarray[c.x + c.y * 50].current.style['transition-delay'] = `${count * 8}ms`
      refarray[c.x + c.y * 50].current.classList.add('visited')
      
      if (c.x === target.x && c.y === target.y) return [c, count]

      if (c.y + 1 < 25 && !hashmap[`${c.x}-${c.y + 1}`] && !graph[c.y + 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y + 1 })
        prevmap[`${c.x}-${c.y + 1}`] = { ...c }
        hashmap[`${c.x}-${c.y + 1}`] = true
      }
      if (c.x - 1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x - 1].iswall) {
        queue.unshift({ x: c.x - 1, y: c.y })
        prevmap[`${c.x - 1}-${c.y}`] = { ...c }
        hashmap[`${c.x - 1}-${c.y}`] = true
      }
      if (c.y - 1 >= 0 && !hashmap[`${c.x}-${c.y - 1}`] && !graph[c.y - 1][c.x].iswall) {
        queue.unshift({ x: c.x, y: c.y - 1 })
        prevmap[`${c.x}-${c.y - 1}`] = { ...c }
        hashmap[`${c.x}-${c.y - 1}`] = true
      }
      if (c.x + 1 < 50 && !hashmap[`${c.x + 1}-${c.y}`] && !graph[c.y][c.x + 1].iswall) {
        queue.unshift({ x: c.x + 1, y: c.y })
        prevmap[`${c.x + 1}-${c.y}`] = { ...c }
        hashmap[`${c.x + 1}-${c.y}`] = true
      }
    }
    return null
  }

  function dijkstra(graph, hashmap, prevmap, start, target) {
    let distances = {}
    let pqueue = []
    
    // Initialize distances and priority queue
    for (let j = 0; j < 25; j++) {
      for (let i = 0; i < 50; i++) {
        distances[`${i}-${j}`] = Infinity
      }
    }
    distances[`${start.x}-${start.y}`] = 0
    pqueue.push({ node: start, distance: 0 })
    
    let count = 0
    
    while (pqueue.length > 0) {
      // Sort by distance to get the closest node
      pqueue.sort((a, b) => a.distance - b.distance)
      let current = pqueue.shift()
      let c = current.node
      
      if (hashmap[`${c.x}-${c.y}`]) continue
      
      count += 1
      hashmap[`${c.x}-${c.y}`] = true
      refarray[c.x + c.y * 50].current.style['transition-delay'] = `${count * 8}ms`
      refarray[c.x + c.y * 50].current.classList.add('visited')
      
      if (c.x === target.x && c.y === target.y) return [c, count]
      
      // Check all 4 neighbors
      const neighbors = [
        { x: c.x + 1, y: c.y },
        { x: c.x - 1, y: c.y },
        { x: c.x, y: c.y + 1 },
        { x: c.x, y: c.y - 1 }
      ]
      
      neighbors.forEach(neighbor => {
        if (neighbor.x >= 0 && neighbor.x < 50 && neighbor.y >= 0 && neighbor.y < 25) {
          if (!graph[neighbor.y][neighbor.x].iswall && !hashmap[`${neighbor.x}-${neighbor.y}`]) {
            let weight = graph[neighbor.y][neighbor.x].weight
            let newDistance = distances[`${c.x}-${c.y}`] + weight
            
            if (newDistance < distances[`${neighbor.x}-${neighbor.y}`]) {
              distances[`${neighbor.x}-${neighbor.y}`] = newDistance
              prevmap[`${neighbor.x}-${neighbor.y}`] = { ...c }
              pqueue.push({ node: neighbor, distance: newDistance })
            }
          }
        }
      })
    }
    return null
  }

  useEffect(() => {
    if (algo === 'BFS') {
      let hashmap = {}
      let prevmap = {}
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false
          prevmap[`${i}-${j}`] = null
        }
      }
      let result = BFS(grid, hashmap, prevmap, start.current, end.current)
      let path = []
      if (result != null) {
        let current = result[0]
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current)
          current = prevmap[`${current.x}-${current.y}`]
        }
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style['transition-delay'] = `${(index) * 15}ms`
            refarray[elem.x + elem.y * 50].current.classList.add('path')
          })
        }, result[1] * 9)
      }
    }
    
    if (algo === 'DFS') {
      let hashmap = {}
      let prevmap = {}
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false
          prevmap[`${i}-${j}`] = null
        }
      }
      let result = DFS(grid, hashmap, prevmap, start.current, end.current)
      let path = []
      if (result != null) {
        let current = result[0]
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current)
          current = prevmap[`${current.x}-${current.y}`]
        }
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style['transition-delay'] = `${(index) * 15}ms`
            refarray[elem.x + elem.y * 50].current.classList.add('path')
          })
        }, result[1] * 9)
      }
    }
    
    if (algo === 'Dijkstra') {
      let hashmap = {}
      let prevmap = {}
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false
          prevmap[`${i}-${j}`] = null
        }
      }
      let result = dijkstra(grid, hashmap, prevmap, start.current, end.current)
      let path = []
      if (result != null) {
        let current = result[0]
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current)
          current = prevmap[`${current.x}-${current.y}`]
        }
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style['transition-delay'] = `${(index) * 15}ms`
            refarray[elem.x + elem.y * 50].current.classList.add('path')
          })
        }, result[1] * 9)
      }
    }
  }, [run])

  useEffect(() => {
    refarray.forEach((elem) => { elem.current.style['transition-delay'] = '0ms' })
    refarray.forEach((elem) => { elem.current.classList.remove('visited'); elem.current.classList.remove('path') })
  }, [res])

  return (
    <div className='board'>
      {refarray.map((elem, index) => {
        let classList = ['cell']
        let yindex = Math.floor(index / 50)
        let xindex = index % 50
        let cell = grid[yindex][xindex]

        if (cell.iswall) {
          classList.push('wall')
        }

        return (
          <div
            key={`${index}`}
            ref={elem}
            className={classList.join(' ')}
            onMouseDown={() => { seteditFlag(true) }}
            onMouseUp={() => { seteditFlag(false) }}
            onMouseMove={() => {
              if (!editing) return
              const current = grid[yindex][xindex]
              if (current.isstart || current.istarget) return
              
              switch (mode) {
                case 'setstart':
                  var newgrid = grid.map((elem) => {
                    return elem.map((elem) => {
                      if (!elem.isstart) return elem
                      return { ...elem, isstart: false }
                    })
                  })
                  newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], isstart: true, istarget: false, weight: 1, iswall: false }
                  start.current = { x: xindex, y: yindex }
                  setgrid(newgrid)
                  break;

                case 'settarget':
                  var newgrid = grid.map((elem) => {
                    return elem.map((elem) => {
                      if (!elem.istarget) return elem
                      return { ...elem, istarget: false }
                    })
                  })
                  newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], isstart: false, istarget: true, weight: 1, iswall: false }
                  end.current = { x: xindex, y: yindex }
                  setgrid(newgrid)
                  break;

                case 'addbricks':
                  var newgrid = grid.slice()
                  newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 1, iswall: true }
                  setgrid(newgrid)
                  break;

                case 'addweight':
                  var newgrid = grid.slice()
                  newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 5, iswall: false }
                  setgrid(newgrid)
                  break;
                default:
                  return
              }
            }}
          >
            {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
            {cell.isstart ? <i className="bi bi-geo-alt"></i> : null}
            {cell.istarget ? <i className="bi bi-geo"></i> : null}
          </div>
        )
      })}
    </div>
  )
}