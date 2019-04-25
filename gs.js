const m = 400
const n = 20
const frames = 1

const RandomGrid = () => {
  const grid = new Array(n)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(n)
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = Math.floor(Math.random() * 2)
    }
  }
  return grid
}

const NGeneration = (grid) => {
  const nextGrid = new Array(grid.length)
  for (let i = 0; i < grid.length; i++) {
    nextGrid[i] = new Array(grid.length)
    for (let j = 0; j < nextGrid[i].length; j++) {
      const valoare = grid[i][j]
      const vecini = cvecini(grid, i, j)
      if (valoare === 0 && vecini === 3) {
        nextGrid[i][j] = 1
      } else if (
        (valoare === 1) &&
        (vecini < 2 || vecini > 3)
      ) {
        nextGrid[i][j] = 0
      } else {
        nextGrid[i][j] = valoare
      }
    }
  }
  return nextGrid
}

const cvecini = (grid, x, y) => {
  let sum = 0
  const rinduri = grid.length
  const coloane = grid[0].length
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (x + i + rinduri) % rinduri
      const col = (y + j + coloane) % coloane
      sum += grid[row][col]
    }
  }
  sum -= grid[x][y]
  return sum
}

const cellColor = '#000'
const Scell = m / n

const draw = (ctx, grid) => {
  ctx.strokeStyle = cellColor
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const value = grid[i][j]
      if (value) {
        ctx.fillStyle = '#e60000'
        ctx.fillRect(i * Scell, j * Scell, Scell, Scell,)
      }
      ctx.strokeRect(i * Scell, j * Scell, Scell, Scell,)
    }
  }
}

const generation = (ctx, grid) => {
  ctx.clearRect(0, 0, m, m)
  draw(ctx, grid)
  const gridOfNGeneration = NGeneration(grid)
  setTimeout(() => {
    requestAnimationFrame(() => generation(ctx, gridOfNGeneration))
  }, 1000 / frames)

}

window.onload = () => {
  const canvas = document.getElementById('canvass')
  const ctx = canvas.getContext('2d')
  const grid = RandomGrid()
  generation(ctx, grid)
}