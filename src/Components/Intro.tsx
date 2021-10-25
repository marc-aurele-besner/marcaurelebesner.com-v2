import * as THREE from 'three'
import React, { useEffect, useState} from 'react'
import { useFrame } from '@react-three/fiber'

interface IntroProps {
    start: boolean
    play: number
    set: (value: boolean) => void
  }

const Intro: React.FC<IntroProps> = ({ start, play, set }) => {
  const [vec] = useState(() => new THREE.Vector3())

  const [rotation, setRotation] = useState(0)

  useEffect(() => { window.setTimeout(function () { set(true) }, 500) }, [])

  return useFrame((state) => {
    if (start && !play) {
      state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
      state.camera.lookAt(0, 0, 0)
      if (rotation > 0) {
        setRotation( rotation - 1 )
      }
    }
    if (start && play) {
      state.camera.position.lerp(vec.set(state.mouse.x * 5, 1 + state.mouse.y * 1.5, 16), 0.05)
      state.camera.lookAt(0, 0, 0)
      if (rotation < 40) {
        setRotation( rotation + 1 )
      }
    }
    state.camera.rotateY(-rotation / 100)
  })
}

export default Intro