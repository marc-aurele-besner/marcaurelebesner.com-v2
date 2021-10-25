
import React, { useState, useEffect, useCallback } from "react"
import { useGLTF, useTexture, Shadow, meshBounds } from "@react-three/drei"
import { a } from "@react-spring/three"
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Sphere: THREE.Mesh
  }
  materials: {
    track: THREE.MeshStandardMaterial
    sphere: THREE.MeshStandardMaterial
  }
}

interface SwitchPlayProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xPlay: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPlay: any
  scale: number
  position: THREE.Vector3
  rotation: THREE.Euler
}

const SwitchPlay: React.FC<SwitchPlayProps> = ({ xPlay, setPlay, scale, position, rotation }) => {
  const { nodes, materials } = useGLTF("/models/switch.glb") as GLTFResult
  const texture = useTexture("/textures/ballPlayUvMap.png")
  // Hover state
  const [hovered, setHover] = useState(false)
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])
  // Events
  const onClick = useCallback(() => setPlay((play: boolean) => Number(!play)), [setPlay])
  const onPointerOver = useCallback(() => setHover(true), [])
  const onPointerOut = useCallback(() => setHover(false), [])
  // Interpolations
  const pZ = xPlay.to([0, 1], [-1.2, 1.2])
  const rX = xPlay.to([0, 1], [-Math.PI / 2, Math.PI * 1.3])
  const color = xPlay.to([0, 1], ["#888", "#2a2a2a"])
  return (
    <group dispose={null} scale={scale} position={position} rotation={rotation} >
      <a.mesh receiveShadow castShadow material={materials.track} geometry={nodes.Cube.geometry} material-roughness={0.5} material-metalness={0.8}/>
      <a.group position-y={0.85} position-z={pZ}>
        <a.mesh receiveShadow castShadow raycast={meshBounds} rotation-x={rX} rotation-y={Math.PI / 2 - 0.5} rotation-z={Math.PI / 2 + 0.3} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <a.meshStandardMaterial roughness={0.5} map={texture} />
        </a.mesh>
        <a.pointLight intensity={100} distance={1.4} color={color} />
        <Shadow renderOrder={-1000} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]} />
      </a.group>
    </group>
  )
}

export default SwitchPlay