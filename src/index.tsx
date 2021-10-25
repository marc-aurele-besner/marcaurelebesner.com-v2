import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import "./styles.css"
import Scene from './Canvas'
import './styles.css'

const App = () => {
    const [toggle, set] = useState(0)
    const [{ x }] = useSpring({ x: toggle, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [toggle])
    return (
        <a.div className="container" style={{ backgroundColor: x.to([0, 1], ["black", "#ff2558"]), color: x.to([0, 1], ["#888", "#c70f46"]) }}>
            <Scene x={x} set={set} toggle={toggle} />
        </a.div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
