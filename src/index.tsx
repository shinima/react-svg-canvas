import './preloaded'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Rsc from './rsc'
import { range } from './utils'
import { BrickWall, SteelWall } from './testElements'

const container = document.querySelector('#container')
const canvasElement = document.querySelector('canvas')
const ctx = canvasElement.getContext('2d')

let count = 0
let sum = 0

class Test extends React.Component {
  state = {
    x: 16,
    y: 16,
  }

  componentDidMount() {
    console.log('did-mount')
    requestAnimationFrame(this.move)
  }

  move = () => {
    const start = performance.now()
    this.setState({ x: this.state.x + 1, y: this.state.y + 1 }, () => {
      count++
      const end = performance.now()
      sum += end - start
    })
    if (count < 100) {
      requestAnimationFrame(this.move)
    } else {
      console.log('count:', count)
      console.log('sum:', sum)
    }
  }

  render() {
    const { x, y } = this.state
    return (
      <g role="brickwall" transform={`translate(${x}, ${y})scale(2)`}>
        {range(20).map(x =>
          range(20).map(y => {
            return Math.random() < 0.5 ?
              <BrickWall x={4 * x} y={4 * y} />
              : null
          })
        )}
      </g>
    )
  }
}

function render(element: JSX.Element) {
  Rsc.draw(element, ctx)

  ReactDOM.render(
    <svg width={800} height={400}>
      {element}
    </svg>,
    container,
  )
}

render(
  <Test />
)
