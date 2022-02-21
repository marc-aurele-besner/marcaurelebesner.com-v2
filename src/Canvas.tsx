import * as THREE from 'three'
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from "@react-three/drei"
import { useSpring } from '@react-spring/core'
import { a } from "@react-spring/three"
import { Physics } from '@react-three/cannon'
import { ResizeObserver } from '@juggle/resize-observer'
import Loader from 'react-loader-spinner'

import Overlay from './Components/Overlay'
import Intro from './Components/Intro'
import GroundReflection from './Components/GroundReflection'
import VideoTextMarcAurele from './Components/VideoTextMarcAurele'
import VideoTextRealisations from './Components/VideoTextRealisations'
import Tv from './Components/Tv'
import MacGolfAlpine from './Components/MacGolfAlpine'
import MacPlantswap from './Components/MacPlantswap'
import MacCollageOfMyself from './Components/MacCollageOfMyself'
import PhoneGolfAlpine from './Components/PhoneGolfAlpine'
import PhonePlantswap from './Components/PhonePlantswap'
import PhoneCollageOfMyself from './Components/PhoneCollageOfMyself'
import SocialCubes from './Components/SocialCubes'
import SwitchColor from './Components/SwitchColor'
import SwitchPlay from './Components/SwitchPlay'
import MacContactForm from './Components/MacContactForm'

interface SceneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: any
  toggle: number
}

const Scene: React.FC<SceneProps> = ({ x, set, toggle }) => {
  const color = x.to([0, 1], ["#FFF", "#000"])
  const [clicked, setClicked] = useState(false)
  const [play, setPlay] = useState(0)
  const [ready, setReady] = useState(false)
  const [contact, setContact] = useState(false)
  const store = { clicked, setClicked, ready, setReady }
  const [{ xPlay }] = useSpring({ 
    xPlay: play, 
    config: { 
      mass: 5, 
      tension: 1000, 
      friction: 50, 
      precision: 0.0001 
    } }, [play])

    const mql = window.matchMedia("(orientation: portrait)");
    let startCameraPosition = new THREE.Vector3(-10, 10, 20)
    let startCameraFov = 15
    // If there are matches, we're in portrait
    if(mql.matches) {  
      startCameraPosition = new THREE.Vector3(-10, 10, 50)
      startCameraFov = 55
    }
  return (
    <>
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ alpha: false }} 
        camera={{ 
          position: startCameraPosition, 
          fov: startCameraFov 
        }}
        resize={{ polyfill: ResizeObserver }}>
        <color attach="background" args={toggle > 0 ? ['#000'] : ['#FFF']} />
        <fog attach="fog" args={[toggle > 0 ? '#000' : '#FFF', 15, 20]} />
        {/* Change background for stars when play is on */}
        {play && (
          <Stars radius={100} depth={50} count={5000} />
        )}
        <ambientLight intensity={0.1} />
        <directionalLight position={[-20, 20, 20]} intensity={1} />
        <a.directionalLight position={[-20, -20, -20]} intensity={0.5} color={color} />
        <a.pointLight position={[0, 0, 5]} distance={5} intensity={5} color={color} />
        <a.spotLight
          color={color}
          position={[10, 20, 20]}
          angle={0.1}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
        />
        
        <Suspense fallback={<Loader type="Circles" color="#00BFFF" height={80} width={80}/>}>
            <Physics>
                <SwitchColor 
                  x={x} 
                  set={set} 
                  scale={0.25} 
                  position={new THREE.Vector3(3, -1, 0.5)} 
                  rotation={new THREE.Euler(0, Math.PI + 0.7, 0)}
                />
                <SwitchPlay 
                  xPlay={xPlay} 
                  setPlay={setPlay} 
                  scale={0.25}
                  position={new THREE.Vector3(3.2, -1, -1.2)}
                  rotation={new THREE.Euler(0, Math.PI + 0.7, 0)}
                />
                <group position={[0, -1, 0]}>
                    <VideoTextMarcAurele 
                       position={new THREE.Vector3(0, 1.3, -2)}
                       {...store}
                    />
                    <VideoTextRealisations 
                      position={new THREE.Vector3(8, 1.3, 0)}
                      rotation={new THREE.Euler(0, -0.4, 0)}
                      {...store}
                    />
                    <MacGolfAlpine 
                      rotation={new THREE.Euler(0, 0.1, 0)} 
                      position={new THREE.Vector3(4.75, 0.01, 0.2)} 
                      scale={new THREE.Vector3(0.15, 0.15, 0.15)} 
                      play={play}
                    />
                    <PhoneGolfAlpine
                      rotation={new THREE.Euler(0, Math.PI, 0)} 
                      position={new THREE.Vector3(5.75, 0.45, 0.5)} 
                      scale={new THREE.Vector3(0.35, 0.35, 0.35)} 
                      play={play}
                    />
                    <MacPlantswap 
                      rotation={new THREE.Euler(0, -0.35, 0)} 
                      position={new THREE.Vector3(7, 0.01, 0.6)} 
                      scale={new THREE.Vector3(0.15, 0.15, 0.15)} 
                      switchColor={toggle}
                      play={play}
                    />
                    <PhonePlantswap
                      rotation={new THREE.Euler(0, Math.PI - 0.5, 0)} 
                      position={new THREE.Vector3(7.8, 0.45, 1.25)} 
                      scale={new THREE.Vector3(0.35, 0.35, 0.35)} 
                      switchColor={toggle}
                      play={play}
                    />
                    <MacCollageOfMyself
                      rotation={new THREE.Euler(0, -0.9, 0)} 
                      position={new THREE.Vector3(9, 0.01, 2)} 
                      scale={new THREE.Vector3(0.15, 0.15, 0.15)} 
                      switchColor={toggle}
                      play={play}
                    />
                    <PhoneCollageOfMyself
                      rotation={new THREE.Euler(0, Math.PI - 1, 0)} 
                      position={new THREE.Vector3(9.6, 0.45, 3)} 
                      scale={new THREE.Vector3(0.35, 0.35, 0.35)} 
                      switchColor={toggle}
                      play={play}
                    />
                    <Tv 
                      rotation={new THREE.Euler(0, Math.PI + 0.4, 0)} 
                      position={new THREE.Vector3(-2.2, 0, 0.6)} 
                      scale={new THREE.Vector3(0.35, 0.35, 0.35)} 
                      clicked={clicked} />
                    <SocialCubes 
                      switchColor={toggle} 
                      play={play} 
                      contact={contact}
                      setContact={setContact}
                    />
                    <GroundReflection x={x} />
                    <MacContactForm
                      rotation={new THREE.Euler(0, 0, 0)} 
                      position={new THREE.Vector3(0, 3.75, 2)} 
                      scale={new THREE.Vector3(0.25, 0.25, 0.25)} 
                      clicked={clicked}
                      switchColor={toggle}
                      contact={contact}
                      setContact={setContact}
                    />
                </group>
            </Physics>
            <Intro 
              start={ready && clicked} 
              play={play} 
              set={setReady} 
              contact={contact}
            />
        </Suspense>
        <mesh receiveShadow renderOrder={1000} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <a.shadowMaterial transparent opacity={x.to((x: any) => 0.1 + x * 0.2)} />
        </mesh>
        </Canvas>
        <Overlay {...store} />
    </>
  )
}

export default Scene