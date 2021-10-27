import blank from './images/blank.png'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'

const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]
const width = 8
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

export const checkForColumnOfFour = ({ colorArray, isMatch, setScore }) => {
  for (let idx = 0; idx <= 39; idx++) {
    const idxArray = [idx, idx + 8, idx + 16, idx + 24]
    const isColumnOfThree = idxArray.every(
      (index) => colorArray[index] === colorArray[idx]
    )
    const isBlank = colorArray[idx] === blank
    if (isColumnOfThree && !isBlank) {
      // this changes randomColorArray, but does not cause DOM to update.
      idxArray.forEach((index) => (colorArray[index] = blank))
      isMatch = true
      setScore((s) => s + 4)
    }
  }
  return { colorArray, isMatch, setScore }
}

export const checkForRowOfFour = ({ colorArray, isMatch, setScore }) => {
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
      const isBlank = colorArray[idx] === blank
      if (isColumnOfThree && !isBlank) {
        // this changes randomColorArray, but does not cause DOM to update.
        idxArray.forEach((index) => (colorArray[index] = blank))
        isMatch = true
        setScore((s) => s + 4)
      }
    }
  }
  return { colorArray, isMatch, setScore }
}

export const checkForColumnOfThree = ({ colorArray, isMatch, setScore }) => {
  for (let idx = 0; idx <= 47; idx++) {
    const idxArray = [idx, idx + 8, idx + 16]
    const isColumnOfThree = idxArray.every(
      (index) => colorArray[index] === colorArray[idx]
    )
    const isBlank = colorArray[idx] === blank
    if (isColumnOfThree && !isBlank) {
      // this changes colorArray, but does not cause DOM to update.
      idxArray.forEach((index) => (colorArray[index] = blank))
      isMatch = true
      setScore((s) => s + 3)
    }
  }
  return { colorArray, isMatch, setScore }
}

export const checkForRowOfThree = ({ colorArray, isMatch, setScore }) => {
  const notValid = [
    6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
  ]
  for (let idx = 0; idx < colorArray.length; idx++) {
    if (!notValid.includes(idx)) {
      const idxArray = [idx, idx + 1, idx + 2]
      const isColumnOfThree = idxArray.every(
        (index) => colorArray[index] === colorArray[idx]
      )
      const isBlank = colorArray[idx] === blank
      if (isColumnOfThree && !isBlank) {
        idxArray.forEach((index) => (colorArray[index] = blank))
        isMatch = true
        setScore((s) => s + 3)
      }
    }
  }
  return { colorArray, isMatch, setScore }
}

export const moveIntoSquareBelow = ({ colorArray, isMatch, setScore }) => {
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
