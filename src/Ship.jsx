import { useRef, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Ship = () => {
  const ref = useRef()
  const ship = useGLTF('./models/shipnew.glb')
  console.log('ship', ship )

  let mixer = new THREE.AnimationMixer(ship.scene);
  ship.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      console.log('current action : ', clip)
      action.play();
  });

  useFrame((state, delta) => {
      mixer.update(delta);
  });
  
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
          <mesh castShadow key={index} geometry={child.geometry} material={child.material} position={[0,20,0]}>
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