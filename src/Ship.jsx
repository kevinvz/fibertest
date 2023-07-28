import { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

const Ship = () => {
  const ref = useRef()
  const ship = useGLTF('./models/shipnew.glb')
  console.log('ship', ship )
  
  // Load each texture individually using useTexture
  const texture3 = ship.scene.children.map((child) => {
    if (child.material && child.material.map) {
      return child.material.map
    } else {
      return null;
    }
  })


  return (
    <group ref={ref} dispose={null}>
      <group name="Scene">
        <group scale={0.2}>
          {ship.scene.children.map((child, index) => (
          <mesh castShadow key={index} geometry={child.geometry} material={child.material} position={[0,10,0]}>
            {/* If the child has a texture, apply it */}
            {texture3[index] && <primitive object={texture3[index]} attach="map" />}
          </mesh>
        ))}
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(['./models/shipnew.glb'])

export default Ship