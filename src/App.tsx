import { useState } from 'react'
import './App.css'

interface coordinatesProps {
  pageX: number,
  pageY: number,
}

function App() {
  const [coordinates, setCoordinates] = useState<coordinatesProps[]>([])
  const [undoCoordinates, setUndoCoordinates] = useState<coordinatesProps[]>([])
  const [diameter, setDiameter] = useState(20)
  const [colorCircle, setColorCircle] = useState('#1cb51c')

  function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    const { pageX, pageY } = e
    setCoordinates([...coordinates, { pageX, pageY }])
  }

  function handleUndo() {
    const newCoordinates = [...coordinates]
    const singleUndoCoordinate = newCoordinates.pop()
    if (singleUndoCoordinate === undefined)
      return
    setCoordinates(newCoordinates)
    setUndoCoordinates([...undoCoordinates, singleUndoCoordinate])
  }

  function handleRedo() {
    const newUndoCoordinates = [...undoCoordinates]
    const singleRedoCoordinate = newUndoCoordinates.pop()
    if (singleRedoCoordinate === undefined)
      return
    setCoordinates([...coordinates, singleRedoCoordinate])
    setUndoCoordinates(newUndoCoordinates)
  }

  return (
    <main>
      <header>
        <button disabled={coordinates.length === 0} onClick={handleUndo}>Undo</button>
        <div className='input_box'>
          <label htmlFor="diameter">Diameter of the circle</label>
          <input
            className='input_field'
            name='diameter'
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(Number(e.target.value))}
          />
        </div>

        <div className='input_box'>
          <label htmlFor="color">Color of the circle</label>
          <input
            className='input_field'
            name='color'
            type="color"
            value={colorCircle}
            onChange={(e) => setColorCircle(e.target.value)}
          />
        </div>
        <button disabled={undoCoordinates.length === 0} onClick={handleRedo}>Redo</button>
      </header>
      <section className='circles_area' onClick={handleOnClick}>
        {
          coordinates.map((coordinate, index) => {
            return (
              <div
                key={index}
                className='circle'
                style={{
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                  backgroundColor: `${colorCircle}`,
                  left: coordinate.pageX,
                  top: coordinate.pageY,
                }}
              ></div>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
