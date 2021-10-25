import * as THREE from 'three'
import React, { useState, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
// import { useBox } from '@react-three/cannon'
import useStore from '../states/useStore'

interface CubesProps {
    type: string
    link: string
    position: THREE.Vector3
    rotation: THREE.Euler
    scale: THREE.Vector3
    switchColor: number
    play: number
}
  
const Cubes: React.FC<CubesProps> = ({ type, link, position, rotation, scale, switchColor, play, ...props}) => {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    const texture = useLoader(THREE.TextureLoader, `/social/${type}.png`)
    const color = switchColor > 0 ? "#E59F35" : "#69c1af"
    let handleOnClick = () => { 
        setClicked(!clicked)
        window.open(link, '_blank')
    }
    if(play) {
        handleOnClick = () => null
    }
    return (
        <mesh
            ref={ref}
            onClick={() => handleOnClick()}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            position={position}
            rotation={rotation}
            scale={scale}
            {...props}>
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial attach="material" map={texture} color={hovered!==false ? color : 'white'} />
        </mesh>
    )
}
  
interface SocialCubesProps {
    switchColor: number
    play: number
}
  
const SocialCubes: React.FC<SocialCubesProps> = ({ switchColor, play }) => {
   const social = useStore(state => state.social)
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   let returnCubes: any = null
    if(social) {
        returnCubes = social.map((item) => {
            return (
                <Cubes 
                    type={item.type} 
                    link={item.link} 
                    position={new THREE.Vector3(item.position.x, item.position.y, item.position.z)}
                    rotation={new THREE.Euler(0, Math.PI + 0.4, 0)}
                    scale={new THREE.Vector3(0.25, 0.25, 0.25)}
                    switchColor={switchColor}
                    play={play}
                />
            )
        })
    }
    return returnCubes
}

export default SocialCubes