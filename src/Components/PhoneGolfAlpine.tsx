import * as THREE from 'three'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Plane, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Phone: THREE.Mesh
    Circle: THREE.Mesh
    Circle001: THREE.Mesh
    Circle002: THREE.Mesh
    Circle004_1: THREE.Mesh
    Circle004_2: THREE.Mesh
    Circle005: THREE.Mesh
    Circle010: THREE.Mesh
    Circle010_1: THREE.Mesh
    Circle006: THREE.Mesh
    Cube001: THREE.Mesh
    Cube002_1: THREE.Mesh
    Cube003: THREE.Mesh
    Cube004: THREE.Mesh
    Cylinder: THREE.Mesh
    Cylinder001: THREE.Mesh
    Plane001: THREE.Mesh
    Plane001_1: THREE.Mesh
    Plane003: THREE.Mesh
    Plane003_1: THREE.Mesh
    Plane002_1: THREE.Mesh
    Plane002_2: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
    cAMERA: THREE.MeshStandardMaterial
    Lens: THREE.MeshStandardMaterial
    ['Lens Metal']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Inverted Lens']: THREE.MeshStandardMaterial
    ['Metal ']: THREE.MeshStandardMaterial
    ['Protection Glass']: THREE.MeshPhysicalMaterial
    Glass: THREE.MeshPhysicalMaterial
    Screen: THREE.MeshStandardMaterial
  }
}

interface ScreenshotProps {
  play: number
}

const Screenshot: React.FC<ScreenshotProps> = ({ play, ...props }) => {
  const texture = useLoader(THREE.TextureLoader, `/images/screenshotPhoneGolfAlpine.png`)
  const [hovered, setHover] = useState(false)
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  const onPointerOver = useCallback(() => setHover(true), [])
  const onPointerOut = useCallback(() => setHover(false), [])

  const handleOnClickPlantswap = () => { 
    if (play === 1) {
      window.open('https://golfalpine.ca', '_blank')
    }
  }
  
  return (
    <Plane 
      rotation={[Math.PI / 2, 0, Math.PI]}
      position={new THREE.Vector3(0, 0, 0)}
      args={[1.15, 2.2]}
      onClick={() => handleOnClickPlantswap()}
      onPointerOver={onPointerOver} 
      onPointerOut={onPointerOut}
      {...props}>
        <meshBasicMaterial attach="material" map={texture} />
    </Plane>
  )
}

interface PhoneProps {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  play: number
}

const PhoneGolfAlpine: React.FC<PhoneProps> = ({ play, ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/iPhone.glb') as GLTFResult
 
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Phone.geometry} material={nodes.Phone.material} position={[0.07, 0.01, 0.11]} scale={0.6}>
        <mesh
          geometry={nodes.Circle.geometry}
          material={nodes.Circle.material}
          position={[-0.27, 1.5, 0.06]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.67}>
          <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} position={[-0.23, 0, -0.13]} />
          <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} position={[-0.23, 0, 0.13]} />
          <group position={[0, 0.01, -0.19]} scale={0.5}>
            <mesh geometry={nodes.Circle004_1.geometry} material={materials.Lens} />
            <mesh geometry={nodes.Circle004_2.geometry} material={nodes.Circle004_2.material} />
          </group>
          <mesh
            geometry={nodes.Circle005.geometry}
            material={materials['Material.002']}
            position={[0.08, 0.01, 0.13]}
            scale={0.16}
          />
          <group position={[0, 0.01, 0.19]} scale={0.5}>
            <mesh geometry={nodes.Circle010.geometry} material={materials['Inverted Lens']} />
            <mesh geometry={nodes.Circle010_1.geometry} material={nodes.Circle010_1.material} />
          </group>
        </mesh>
        <mesh
          geometry={nodes.Circle006.geometry}
          material={materials['Metal ']}
          position={[-0.08, -2.07, -0.05]}
          scale={0.57}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[0.81, -1.13, -0.05]}
          scale={1.67}
        />
        <mesh
          geometry={nodes.Cube002_1.geometry}
          material={nodes.Cube002_1.material}
          position={[0.99, 0.51, -0.05]}
          scale={1.67}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[0.99, 0.87, -0.05]}
          scale={1.67}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[1, 1.2, -0.06]}
          scale={0.67}
        />
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={nodes.Cylinder.material}
          position={[-0.19, 1.94, -0.15]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.67}
        />
        <mesh
          geometry={nodes.Cylinder001.geometry}
          material={nodes.Cylinder001.material}
          position={[-0.08, 1.94, -0.15]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <group position={[-0.44, 1.49, 0.07]} rotation={[Math.PI / 2, 0, 0]} scale={0.5}>
          <mesh geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} />
          <mesh geometry={nodes.Plane001_1.geometry} material={nodes.Plane001_1.material} />
        </group>
        <group position={[-0.44, 1.49, 0.07]} scale={[1.73, 1.73, 1.67]}>
          <mesh geometry={nodes.Plane003.geometry} material={nodes.Plane003.material} />
          <mesh geometry={nodes.Plane003_1.geometry} material={nodes.Plane003_1.material} />
        </group>
        <group position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]} scale={1.67}>
          <Screenshot
            play={play} />
        </group>
      </mesh>
    </group>
  )
}

export default PhoneGolfAlpine