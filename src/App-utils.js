export const createBoard = (width, candyColors) => {
  const randomColorArray = []
  for (let i = 0; i < width * width; i++) {
    const randomColor =
      candyColors[Math.floor(Math.random() * candyColors.length)]
    randomColorArray.push(randomColor)
  }
  return randomColorArray
}
