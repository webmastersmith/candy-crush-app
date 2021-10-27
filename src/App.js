import { useState, useEffect } from 'react'
import { useCallback } from 'react/cjs/react.development'
import styled from 'styled-components/macro'
import {
  createBoard,
  checkForColumnOfFour,
  checkForRowOfFour,
  checkForColumnOfThree,
  checkForRowOfThree,
  moveIntoSquareBelow,
  pipe,
} from './App-utils'

export default function App() {
  const [randomColorArray, setRandomColorArray] = useState([])
  const [tileBeingDragged, setTileBeingDragged] = useState(null)
  const [tileBeingReplaced, setTileBeingReplaced] = useState(null)
  const [score, setScore] = useState(0)
  const intervalDelay = 100

  useEffect(() => {
    // run once on load. Create initial randomColorArray board and add to state.
    setRandomColorArray(createBoard())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dragStart = (e) => setTileBeingDragged(e.target)

  const dragDrop = (e) => setTileBeingReplaced(e.target)

  const dragEnd = (e) => {
    const colorArray = [...randomColorArray]
    const tileDraggedId = parseInt(tileBeingDragged.getAttribute('data-id'))
    const tileReplacedId = parseInt(tileBeingReplaced.getAttribute('data-id'))
    colorArray[tileReplacedId] = tileBeingDragged.getAttribute('src')
    colorArray[tileDraggedId] = tileBeingReplaced.getAttribute('src')

    const validMoves = [
      tileDraggedId - 1,
      tileDraggedId + 1,
      tileDraggedId - 8,
      tileDraggedId + 8,
    ]

    const isValidMove = validMoves.includes(tileReplacedId)
    const { isMatch: isColumnOfFour } = checkForColumnOfFour({
      colorArray,
      isMatch: false,
      setScore,
    })
    const { isMatch: isRowOfFour } = checkForRowOfFour({
      colorArray,
      isMatch: false,
      setScore,
    })
    const { isMatch: isColumnOfThree } = checkForColumnOfThree({
      colorArray,
      isMatch: false,
      setScore,
    })
    const { isMatch: isRowOfThree } = checkForRowOfThree({
      colorArray,
      isMatch: false,
      setScore,
    })

    // console.log(isColumnOfFour, isRowOfFour, isColumnOfThree, isRowOfThree)
    if (
      isValidMove &&
      (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)
    ) {
      setRandomColorArray([...colorArray])
    }
  }

  const count = useCallback(() => {
    return pipe(
      checkForColumnOfFour,
      checkForRowOfFour,
      checkForColumnOfThree,
      checkForRowOfThree,
      moveIntoSquareBelow
    )({
      colorArray: randomColorArray,
      isMatch: false,
      setScore,
    })
  }, [randomColorArray])
  //run set interval and check board for matches
  useEffect(() => {
    const timer = setInterval(() => {
      setRandomColorArray([...count()])
    }, intervalDelay)

    // needed to update state and cause DOM re-render.
    return () => clearInterval(timer)
  }, [count])

  // console.log(tileBeingDragged)
  return (
    <Wrapper>
      <Score>Score: {score}</Score>
      <Game>
        {randomColorArray.map((color, idx) => (
          <Tile
            key={idx}
            src={color}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;
`
const Score = styled.h1`
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
