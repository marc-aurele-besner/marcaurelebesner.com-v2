
import React from 'react'
import { Reflector, useTexture } from '@react-three/drei'

interface GroundProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any
}

const Ground: React.FC<GroundProps> = ({ x }) => {
  const color = x.to([0, 1], ["##a0a0a0", "#c72f46"])
  const [floor, normal] = useTexture(['/images/surfaceReflectionImperfect.jpg', '/images/surfaceReflectionNormal.jpg'])
  return (
    <Reflector resolution={512} args={[40, 40]} mirror={0.4} mixBlur={8} mixStrength={1} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
      {(Material, props) => <Material color={color} metalness={0.4} roughnessMap={floor} normalMap={normal} {...props} />}
    </Reflector>
  ) 
  // +  normalScale={[1, 1]} to <Material>
}

export default Ground