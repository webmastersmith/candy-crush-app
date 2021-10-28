import { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components/macro'
import blank from './images/blank.png'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'

export default function App() {
  const [randomColorArray, setRandomColorArray] = useState([])
  const [tileBeingDragged, setTileBeingDragged] = useState(null)
  const [tileBeingReplaced, setTileBeingReplaced] = useState(null)
  const [score, setScore] = useState(0)
  const intervalDelay = 100

  const candyColors = useMemo(
    () => [
      blueCandy,
      greenCandy,
      orangeCandy,
      purpleCandy,
      redCandy,
      yellowCandy,
    ],
    []
  )
  const width = 8
  const randomColor = (candy) => candy[Math.floor(Math.random() * candy.length)]

  const checkForColumnOfFour = useCallback(() => {
    let isMatch = false
    for (let idx = 0; idx <= 39; idx++) {
      const indexs = [idx, idx + width, idx + width * 2, idx + width * 3]
      const isColumnOfFour = indexs.every(
        (index) => randomColorArray[index] === randomColorArray[idx]
      )
      const isBlank = randomColorArray[idx] === blank
      if (isColumnOfFour && !isBlank) {
        // this changes randomColorArray, but does not cause DOM to update.
        indexs.forEach((index) => (randomColorArray[index] = blank))
        isMatch = true
        setScore((s) => s + 4)
      }
    }
    return isMatch
  }, [randomColorArray])

  const checkForRowOfFour = useCallback(() => {
    let isMatch = false
    const notValid = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 61, 62, 63,
    ]
    for (let idx = 0; idx < randomColorArray.length; idx++) {
      // board end pieces that cannot make four of a kind.
      if (!notValid.includes(idx)) {
        const indexs = [idx, idx + 1, idx + 2, idx + 3]
        const isRowOfFour = indexs.every(
          (index) => randomColorArray[index] === randomColorArray[idx]
        )
        const isBlank = randomColorArray[idx] === blank
        if (isRowOfFour && !isBlank) {
          // this changes randomColorArray, but does not cause DOM to update.
          indexs.forEach((index) => (randomColorArray[index] = blank))
          isMatch = true
          setScore((s) => s + 4)
        }
      }
    }
    return isMatch
  }, [randomColorArray])

  const checkForColumnOfThree = useCallback(() => {
    let isMatch = false
    for (let idx = 0; idx <= 47; idx++) {
      const indexs = [idx, idx + width, idx + width * 2]
      const isColumnOfThree = indexs.every(
        (index) => randomColorArray[index] === randomColorArray[idx]
      )
      const isBlank = randomColorArray[idx] === blank
      if (isColumnOfThree && !isBlank) {
        indexs.forEach((index) => (randomColorArray[index] = blank))
        isMatch = true
        setScore((s) => s + 3)
      }
    }
    return isMatch
  }, [randomColorArray])

  const checkForRowOfThree = useCallback(() => {
    let isMatch = false
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
    ]
    for (let idx = 0; idx < randomColorArray.length; idx++) {
      if (!notValid.includes(idx)) {
        const indexs = [idx, idx + 1, idx + 2]
        const isRowOfThree = indexs.every(
          (index) => randomColorArray[index] === randomColorArray[idx]
        )

        const isBlank = randomColorArray[idx] === blank
        if (isRowOfThree && !isBlank) {
          indexs.forEach((index) => (randomColorArray[index] = blank))
          isMatch = true
          setScore((s) => s + 3)
        }
      }
    }
    return isMatch
  }, [randomColorArray])

  const moveIntoSquareBelow = useCallback(() => {
    let isMatch = false
    //loop through all but last row. Find blank ones and move to top row.
    for (let idx = 0; idx <= 55; idx++) {
      // if blank is in first row, add random candy
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(idx)
      // if blank has made it to the first row, insert random candy color.
      if (isFirstRow && randomColorArray[idx] === blank) {
        randomColorArray[idx] = randomColor(candyColors)
        isMatch = true
      }

      //move all blanks up to top
      if (randomColorArray[idx + width] === blank) {
        isMatch = true
        randomColorArray[idx + width] = randomColorArray[idx]
        randomColorArray[idx] = blank
      }
    }
    return isMatch
  }, [randomColorArray, candyColors])

  // run once on load. Create initial randomColorArray board and add to state.
  useEffect(() => {
    const colorArray = []
    for (let i = 0; i < width * width; i++) {
      colorArray.push(randomColor(candyColors))
    }
    setRandomColorArray(colorArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dragStart = (e) => setTileBeingDragged(e.target)
  const dragDrop = (e) => {
    e.preventDefault()
    setTileBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    // get 'data-id' from tile
    const tileDraggedId = parseInt(tileBeingDragged.getAttribute('data-id'))
    const tileReplacedId = parseInt(tileBeingReplaced.getAttribute('data-id'))

    const validMoves = [
      tileDraggedId - 1,
      tileDraggedId + 1,
      tileDraggedId - width,
      tileDraggedId + width,
    ]

    // check if move is valid before checking if it created a match of 3 or 4.
    const isValidMove = validMoves.includes(tileReplacedId)
    if (isValidMove) {
      //make candy switch, then check if it creates 3 or 4 match.
      randomColorArray[tileReplacedId] = tileBeingDragged.getAttribute('src')
      randomColorArray[tileDraggedId] = tileBeingReplaced.getAttribute('src')
      const isColumnOfFour = checkForColumnOfFour()
      const isRowOfFour = checkForRowOfFour()
      const isColumnOfThree = checkForColumnOfThree()
      const isRowOfThree = checkForRowOfThree()

      // if any are true, do nothing, randomColorArray has already been switched.
      if (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree) {
        // do nothing
      } else {
        // if not a match, return colors back to original.
        randomColorArray[tileReplacedId] = tileBeingReplaced.getAttribute('src')
        randomColorArray[tileDraggedId] = tileBeingDragged.getAttribute('src')
      }
    }
  }

  //run set interval and check board for matches
  useEffect(() => {
    const timer = setInterval(() => {
      const isColumnOfFour = checkForColumnOfFour()
      const isRowOfFour = checkForRowOfFour()
      const isColumnOfThree = checkForColumnOfThree()
      const isRowOfThree = checkForRowOfThree()
      const isMovedBlank = moveIntoSquareBelow()
      // check for changes and re-render view.
      if (
        isColumnOfFour ||
        isRowOfFour ||
        isColumnOfThree ||
        isRowOfThree ||
        isMovedBlank
      ) {
        // spread operator is needed to cause DOM re-render. Else view will not update.
        setRandomColorArray([...randomColorArray])
      }
    }, intervalDelay)

    return () => clearInterval(timer)
  }, [
    randomColorArray,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
  ])

  return (
    <Wrapper>
      <H1>Candy Crush</H1>
      <H1>Score: {score}</H1>
      <Game>
        {randomColorArray.map((candy, idx) => (
          <Tile
            key={idx}
            src={candy}
            alt={idx}
            data-id={idx}
            onDragStart={dragStart}
            draggable={true}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </Game>
      <Rules>
        Candy Crush Rules
        <ul>
          <li>You can only move one space at a time: up, down, left, right</li>
          <li>
            The moved tile must make three or four of a kind to be a valid move
          </li>
        </ul>
      </Rules>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;
`
const H1 = styled.h1`
  &:nth-child(2) {
    margin-bottom: 1rem;
  }
  font-weight: bold;
`
const Game = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 560px;
  height: 560px;
`
const Tile = styled.img`
  width: 70px;
  height: 70px;
`
const Rules = styled.div`
  margin-top: 4rem;
  font-weight: bold;
  text-align: center;
  ul {
    margin-top: 0;
    li {
      text-align: left;
      font-weight: normal;
    }
  }
`
