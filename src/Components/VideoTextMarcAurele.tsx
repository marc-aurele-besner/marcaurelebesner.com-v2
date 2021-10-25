import * as THREE from 'three'
import React, { useEffect, useState} from 'react'
import { Text } from '@react-three/drei'

interface VideoTextMarcAureleProps {
    clicked: boolean
    position: THREE.Vector3
}

const VideoTextMarcAurele: React.FC<VideoTextMarcAureleProps> = ({ clicked, ...props }) => {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/videos/everythingIsPossible.mp4', crossOrigin: 'Anonymous', loop: true, playsinline: true }))
    useEffect(() => void (clicked && video.play()), [video, clicked])
    return (
      <Text font="/fonts/Inter-Bold.woff" fontSize={1.25} letterSpacing={-0.06} {...props}>
        Marc-Aurèle
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </Text>
    ) 
}

export default VideoTextMarcAurele