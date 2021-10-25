import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { Plane } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Tv: THREE.Mesh
    TvStand: THREE.Mesh
  }
  materials: {
    Blackish: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
  }
}

interface VideoTvProps {
  clicked: boolean
}

const VideoTv: React.FC<VideoTvProps> = ({ clicked, ...props }) => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/videos/everythingIsPossible.mp4', crossOrigin: 'Anonymous', loop: true, playsinline: true }))
 
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <Plane 
      rotation={[-Math.PI, 0, Math.PI]}
      position={new THREE.Vector3(0, 1.94, -0.01)}
      args={[3.2, 1.8]}
      {...props}>
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Plane>
  )
}

interface TvProps {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  clicked: boolean
}

const Tv: React.FC<TvProps> = ({ clicked, ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tv.glb') as GLTFResult
 
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Tv.geometry}
        material={materials.Blackish}
        position={[0, 1.94, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.6, 0.02, 0.9]}
      />

      <VideoTv
        clicked={clicked} />
        
      <mesh
        geometry={nodes.TvStand.geometry}
        material={materials.Material}
        position={[0, 0.98, 0.09]}
        scale={[0.77, 0.05, 0.2]}
      />
    </group>
  )
}

export default Tv