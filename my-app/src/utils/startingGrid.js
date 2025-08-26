function getGrid(width,height){
    let grid=[]
    for (let i = 0 ; i < height ; i++){
      let local = []
      for (let j = 0 ; j < width ; j++){
          local.push({x: j, y: i,
                    isstart:false, istarget:false,
                    weight: 1, iswall: false})
          } // set default values for each cell
      grid.push(local)
      }
    grid[Math.floor(height/2)][Math.floor(width/2)].isstart=true // set start cell
    grid[height-2][width-2].istarget=true // set target cell
    return  grid
}

export default getGrid;