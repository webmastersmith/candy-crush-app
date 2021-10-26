const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']
const width = 8
const blank = ''
const randomColor = (candy) => candy[Math.floor(Math.random() * candy.length)]

export const pipe = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  )

export const createBoard = () => {
  const randomColorArray = []
  for (let i = 0; i < width * width; i++) {
    randomColorArray.push(randomColor(candyColors))
  }
  return randomColorArray
}

export const checkForColumnOfFour = (colorArray) => {
  for (let idx = 0; idx <= 39; idx++) {
    const idxArray = [idx, idx + 8, idx + 16, idx + 24]
    const isColumnOfThree = idxArray.every(
      (index) => colorArray[index] === colorArray[idx]
    )
    if (isColumnOfThree) {
      // this changes randomColorArray, but does not cause DOM to update.
      idxArray.forEach((index) => (colorArray[index] = blank))
    }
  }
  return colorArray
}

export const checkForRowOfFour = (colorArray) => {
  const notValid = [
    5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54,
    55, 61, 62, 63,
  ]
  for (let idx = 0; idx < colorArray.length; idx++) {
    // board end pieces that cannot make four of a kind.
    if (!notValid.includes(idx)) {
      const idxArray = [idx, idx + 1, idx + 2, idx + 3]
      const isColumnOfThree = idxArray.every(
        (index) => colorArray[index] === colorArray[idx]
      )
      if (isColumnOfThree) {
        // this changes randomColorArray, but does not cause DOM to update.
        idxArray.forEach((index) => (colorArray[index] = blank))
      }
    }
  }
  return colorArray
}

export const checkForColumnOfThree = (colorArray) => {
  for (let idx = 0; idx <= 39; idx++) {
    const idxArray = [idx, idx + 8, idx + 16]
    const isColumnOfThree = idxArray.every(
      (index) => colorArray[index] === colorArray[idx]
    )
    if (isColumnOfThree) {
      // this changes colorArray, but does not cause DOM to update.
      idxArray.forEach((index) => (colorArray[index] = blank))
    }
  }
  return colorArray
}

export const checkForRowOfThree = (colorArray) => {
  const notValid = [
    6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
  ]
  for (let idx = 0; idx < colorArray.length; idx++) {
    if (!notValid.includes(idx)) {
      const idxArray = [idx, idx + 1, idx + 2]
      const isColumnOfThree = idxArray.every(
        (index) => colorArray[index] === colorArray[idx]
      )
      if (isColumnOfThree) {
        idxArray.forEach((index) => (colorArray[index] = blank))
      }
    }
  }
  return colorArray
}

export const moveIntoSquareBelow = (colorArray) => {
  //loop through all but last row. Find blank ones and move to top row.
  for (let idx = 0; idx <= 55; idx++) {
    // if blank is in first row, add random candy
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(idx)
    if (isFirstRow && colorArray[idx] === blank) {
      colorArray[idx] = randomColor(candyColors)
    }

    //move all blanks up to top
    if (colorArray[idx + 8] === blank) {
      colorArray[idx + 8] = colorArray[idx]
      colorArray[idx] = blank
    }
  }
  return colorArray
}
