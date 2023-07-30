import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import useKeyboard from './useKeyboard'

export default function Ship2(){

    const [shipAnimation, setShipAnimation] = useState('idle')

    const ship = useGLTF('./models/shipnew.glb')
    const animations = useAnimations(ship.animations, ship.scene)
    console.log('Ship2 : ', ship)
    console.log('Ship2 animations : ', animations)
    const keyboard = useKeyboard()
    animations.actions['idle', 'sail'].clampWhenFinished = true
    animations.actions['idle', 'sail'].loop = THREE.LoopOnce
    

    useFrame(() => {
        
        if (document.pointerLockElement) {
            animations.actions[shipAnimation].play()
            if (keyboard['KeyW']) {
                setShipAnimation('sail')
            }
            else if (keyboard['KeyS']) {
                setShipAnimation('sail')
            }
            else if (keyboard['KeyA']) {
                setShipAnimation('sail')
            }
            else if (keyboard['KeyD']) {
                setShipAnimation('sail')
            }
          
          
        }
      })

      const handleKeyUp = (event) => {
        // Your logic here
        console.log('Key released:', event.key)
        animations.actions['sail'].stop()
        setShipAnimation('idle')
      }

      document.addEventListener('keyup', handleKeyUp)

    return <group>
         {ship.scene.children.map((child, index) => (
          <primitive object={ship.scene} scale={0.3} position={[0,2,0]}/>
        ))}
    </group>
}
