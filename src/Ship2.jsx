import { useAnimations, useGLTF, Trail } from '@react-three/drei'
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
         <Trail
            width={5} // Width of the line
            color={'#449db9'} // Color of the line
            length={10} // Length of the line
            decay={1} // How fast the line fades away
            local={false} // Wether to use the target's world or local positions
            stride={0} // Min distance between previous and current point
            interval={1} // Number of frames to wait before next calculation
            target={undefined} // Optional target. This object will produce the trail.
            attenuation={(width) => width} // A function to define the width in each point along it.
            >
        <mesh position={[-0.2,2,0]}/>
        </Trail>
        <Trail
            width={5} // Width of the line
            color={'#449db9'} // Color of the line
            length={10} // Length of the line
            decay={1} // How fast the line fades away
            local={false} // Wether to use the target's world or local positions
            stride={0} // Min distance between previous and current point
            interval={1} // Number of frames to wait before next calculation
            target={undefined} // Optional target. This object will produce the trail.
            attenuation={(width) => width} // A function to define the width in each point along it.
            >
        <mesh position={[0.1,2,0]}/>
        </Trail>
       
    </group>
}
