import * as THREE from 'three'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/web'
import "./styles.css"
import Scene from './Canvas'
import './styles.css'

useGLTF.preload('/models/switch.glb')
useGLTF.preload('/models/mac.glb')
useGLTF.preload('/models/iPhone.glb')

useLoader.preload(THREE.TextureLoader, `/images/screenshotGolfAlpine.png`)
useLoader.preload(THREE.TextureLoader, `/images/screenshotPhoneGolfAlpine.png`)

useLoader.preload(THREE.TextureLoader, `/images/screenshotPlantswapLight.png`)
useLoader.preload(THREE.TextureLoader, `/images/screenshotPlantswapDark.png`)
useLoader.preload(THREE.TextureLoader, `/images/screenshotPhonePlantswapLight.png`)
useLoader.preload(THREE.TextureLoader, `/images/screenshotPhonePlantswapDark.png`)

useLoader.preload(THREE.TextureLoader, `/images/screenshotCollageOfMyself.png`)
useLoader.preload(THREE.TextureLoader, `/images/screenshotPhoneCollageOfMyself.png`)

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
