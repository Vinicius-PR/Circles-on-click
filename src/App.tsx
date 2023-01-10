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
    const {pageX, pageY} = e
    setCoordinates([...coordinates, {pageX, pageY}])
  }

  function handleUndo() {
    const coordinateUndo = coordinates.pop()
    if (coordinateUndo === undefined)
      return
    setUndoCoordinates([...undoCoordinates, coordinateUndo])
  }

  function handleRedo() {
    const coordinateRedo = undoCoordinates.pop()
    if (coordinateRedo === undefined)
      return
    setCoordinates([...coordinates, coordinateRedo])
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
                className = 'circle'
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
