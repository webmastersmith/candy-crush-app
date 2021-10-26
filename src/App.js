import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components/macro'
import { createBoard } from './App-utils'

export default function App() {
  const [randomColorArray, setRandomColorArray] = useState([])
  const width = 8
  const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']

  useEffect(() => {
    setRandomColorArray(createBoard(width, candyColors))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = useCallback(() => {
    for (let idx = 0; idx <= 47; idx++) {
      const idxArray = [idx, idx + width, idx + width * 2]
      const isColumnOfThree = idxArray.every(
        (index) => randomColorArray[index] === randomColorArray[idx]
      )

      if (isColumnOfThree) {
        // this changes randomColorArray, but does not cause state to re-render.
        idxArray.forEach((index) => (randomColorArray[index] = ''))
      }
    }
  }, [randomColorArray])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree()

      // needed to update state
      setRandomColorArray([...randomColorArray])
    }, 1000)
    return () => clearInterval(timer)
  }, [checkForColumnOfThree, randomColorArray])

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
