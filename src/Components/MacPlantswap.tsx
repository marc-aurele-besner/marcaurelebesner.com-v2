import * as THREE from 'three'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Plane, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    keyboard: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    touchbar: THREE.Mesh
  }
  materials: {
    aluminium: THREE.MeshStandardMaterial
    ['matte.001']: THREE.MeshStandardMaterial
    ['screen.001']: THREE.MeshStandardMaterial
    keys: THREE.MeshStandardMaterial
    trackpad: THREE.MeshStandardMaterial
    touchbar: THREE.MeshStandardMaterial
  }
}

interface ScreenshotProps {
  switchColor: number
  play: number
}

const Screenshot: React.FC<ScreenshotProps> = ({ switchColor, play, ...props }) => {
  const textureLight = useLoader(THREE.TextureLoader, `/images/screenshotPlantswapLight.png`)
  const textureDark = useLoader(THREE.TextureLoader, `/images/screenshotPlantswapDark.png`)
  const [hovered, setHover] = useState(false)
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  const onPointerOver = useCallback(() => setHover(true), [])
  const onPointerOut = useCallback(() => setHover(false), [])
  
  const handleOnClickPlantswap = () => { 
    if (play === 1) {
      window.open('https://plantswap.finance', '_blank')
    }
  }
  
  return (
    <Plane 
      rotation={[-Math.PI / 2, 0, 0]}
      position={new THREE.Vector3(0, 0.1, -0.1)}
      args={[8.4, 5.5]}
      onClick={() => handleOnClickPlantswap()}
      onPointerOver={onPointerOver} 
      onPointerOut={onPointerOut}
      {...props}>
        <meshBasicMaterial attach="material" map={switchColor > 0 ? textureDark : textureLight} />
    </Plane>
  )
}

interface MacProps {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  switchColor: number
  play: number
}

const MacPlantswap: React.FC<MacProps> = ({ switchColor, play, ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/mac.glb') as GLTFResult
 
  return (
    <group 
      ref={group}
      dispose={null}
      {...props}>
      <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Cube008.geometry} material={nodes.Cube008.material} />
          <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']} />
          <mesh geometry={nodes.Cube008_2.geometry} material={materials['screen.001']} />
            <Screenshot
              switchColor={switchColor} 
              play={play} />
        </group>
      </group>
      <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.trackpad} />
      </group>
      <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.03, 1.2]} />
    </group>
  )
}

export default MacPlantswap