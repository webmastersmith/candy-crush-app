import { useState, useEffect } from 'react'
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
  const intervalDelay = 1000

  useEffect(() => {
    //run once on load. Create initial randomColorArray board and add to state.
    setRandomColorArray(createBoard())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //run set interval and check board for matches
  useEffect(() => {
    const timer = setInterval(() => {
      const newColorArray = pipe(
        checkForColumnOfFour,
        checkForRowOfFour,
        checkForColumnOfThree,
        checkForRowOfThree,
        moveIntoSquareBelow
      )(randomColorArray)

      // needed to update state and cause DOM re-render.
      setRandomColorArray([...newColorArray])
    }, intervalDelay)
    return () => clearInterval(timer)
  }, [randomColorArray])

  return (
    <Wrapper>
      <Game>
        {randomColorArray.map((color, idx) => (
          <Tile key={idx} style={{ backgroundColor: color }} alt={idx} />
        ))}
      </Game>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
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
