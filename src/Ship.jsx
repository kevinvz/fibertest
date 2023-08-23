import { useRef, useEffect } from 'react'
import { useGLTF, useTexture, Trail } from '@react-three/drei'
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

    console.log('%cIs latest!!!!!!!!!!!!!!!!!!!!!!', 'color:red;')

  return (
    <group ref={ref} dispose={null}>
      <group name="Scene">
     
        <group scale={0.2}>
        <Trail
             width={2} // Width of the line
             color={'#000000'} // Color of the line
             length={100} // Length of the line
             decay={1} // How fast the line fades away
             local={true} // Wether to use the target's world or local positions
             stride={0} // Min distance between previous and current point
             interval={1} // Number of frames to wait before next calculation
             target={undefined} // Optional target. This object will produce the trail.
             attenuation={(width) => width} // A function to define the width in each point along it.
           >
          {ship.scene.children.map((child, index) => (
            
          <mesh castShadow key={index} geometry={child.geometry} material={child.material} position={[0,20,0]}>
            {texture3[index] && <primitive object={texture3[index]} attach="map" />}
          </mesh>
          
        ))}
        </Trail>
        </group>
       
      </group>
    </group>
  )
}

useGLTF.preload(['./models/shipnew.glb'])

export default Ship