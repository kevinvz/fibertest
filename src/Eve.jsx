import { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { LoopOnce, LoopRepeat } from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useStore } from './Game'
import * as THREE from 'three'

const Eve = () => {
  const ref = useRef()
  const ship = useGLTF('./models/shipnew.glb')
  console.log('ship', ship )
  // const { nodes, materials } = useGLTF('./models/eve.glb')
  const idleAnimation = useGLTF('./models/shipnew.glb').animations[12]
  const walkAnimation = useGLTF('./models/shipnew.glb').animations
  const jumpAnimation = useGLTF('./models/eve@jump.glb').animations
  const texture2 = useLoader(TextureLoader, './img/shipbake.jpg')
  // Load each texture individually using useTexture
  const texture3 = ship.scene.children.map((child) => {
    if (child.material && child.material.map) {
      return child.material.map
    } else {
      return null;
    }
  })

  texture2.flipY = false
  console.log(texture2)

  const { actions, mixer } = useStore((state) => state)

  useEffect(() => {
    actions['idle'] = mixer.clipAction(idleAnimation, ref.current)
    console.log('idle animation : ', actions['idle'])
    actions['idle'].loop = LoopOnce
    actions['idle'].clampWhenFinished = true
    actions['walk'] = mixer.clipAction(walkAnimation[13], ref.current)
    actions['walk'].loop = LoopRepeat
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)
    actions['jump'].loop = LoopOnce
    actions['jump'].clampWhenFinished = true

    actions['walk'].play()
  }, [actions, mixer, idleAnimation, walkAnimation, jumpAnimation])

  return (
    <group ref={ref} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.2}>
          {/* <mesh castShadow name="Mesh" frustumCulled={false} geometry={ship.nodes.Plane002.geometry} position={[0,10,0]} >
             <meshStandardMaterial map={texture2} side={THREE.DoubleSide} />
          </mesh> */}
          {ship.scene.children.map((child, index) => (
          <mesh key={index} geometry={child.geometry} material={child.material} position={[0,20,0]}>
            {/* If the child has a texture, apply it */}
            {texture3[index] && <primitive object={texture3[index]} attach="map" />}
          </mesh>
        ))}
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(['./models/eve.glb', './models/shipnew.glb', './models/eve@idle.glb', './models/eve@walking.glb', './models/eve@jump.glb'])

export default Eve