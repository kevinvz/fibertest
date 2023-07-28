import { Canvas } from '@react-three/fiber'
import { Stats, useProgress, Html, Environment } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import AmbientSound from './Sound'
import Shanty from './Shanty'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function App() {
  return (
    <>
      <div id="instructions">
        WASD to move
        <br />
        SPACE to jump.
        <br />
       
      </div>
      <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
        <Shanty />
        <AmbientSound />
        <fog attach="fog" args={['#ddc1c6', 35, 50]} /> {/* color, near, far */}
        <Environment files="./img/sky.hdr" background />
        <Suspense fallback={<Loader />}>
          <spotLight position={[25, 50, 50]} angle={Math.PI / 3} penumbra={1} castShadow shadow-mapSize-height={4096} shadow-mapSize-width={4096} intensity={0.4} />
          <Physics>
            <Game />
          </Physics>
          <Stats />
        </Suspense>
      </Canvas>
    </>
  )
}
