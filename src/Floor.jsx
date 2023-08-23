import { useEffect, useRef } from 'react'
import { usePlane } from '@react-three/cannon'
import { useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useStore } from './Game'
import * as THREE from 'three'


export default function Floor() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], material: 'ground'}), useRef())
  const seaMesh = useRef()
  const textureSea = useLoader(TextureLoader, './img/water2.jpg')
  textureSea.wrapS = THREE.RepeatWrapping
  textureSea.wrapT = THREE.RepeatWrapping
  textureSea.repeat.x = 150
  textureSea.repeat.y = 150
  const compassTexture = useLoader(TextureLoader, './img/compass.png')
  const groundObjects = useStore((state) => state.groundObjects)
  const sea = useGLTF('./models/sea2.glb')
  const island = useGLTF('./models/volcano.glb')
  island.material = 'ground'
  console.log('island', island)
  console.log('sea', sea)
  // const newmaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    seaMesh.current.rotation.y = a/300;
  })

  useEffect(() => {
    const id = ref.current.id
    groundObjects[id] = ref.current
    return () => {
      delete groundObjects[id]
    }
  }, [groundObjects, ref])

  return (
    <group>
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} >
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial  />
    </mesh>
    <group>
    
      <mesh name="sea" ref={seaMesh} frustumCulled={false} geometry={sea.nodes.Plane.geometry} position={[0,2,0]} receiveShadow>
        <meshPhysicalMaterial material={sea.nodes.Plane.material} map={textureSea} roughness={0.1} emissive={0x000f6ff} emissiveIntensity={0.2}/>
      
      </mesh>
     
      </group>
      {island.scene.children.map((child, index) => (
          <primitive object={island.scene} scale={2.5} position={[30,2,30]}>
            <meshPhysicalMaterial emissiveIntensity={1} emissive={0xffffff}/>
          </primitive>  
          
        ))}
    
    <mesh position={[0, 2.05, 0]} rotation= {[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        {/* Use a material (here we use a basic standard material) */}
        <meshStandardMaterial transparent map={compassTexture} />
      </mesh>
    </group>
  )
}
