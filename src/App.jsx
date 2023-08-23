import { Canvas } from '@react-three/fiber'
import { Stats, useProgress, Html, Environment } from '@react-three/drei'
import Game from './Game'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import AmbientSound from './Sound'
import Shanty from './Shanty'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

export default function App() {
  return (
    <>
      <h1 style={{ backgroundColor: 'rgba(0,0,0,0.4)', margin:0, position:'absolute', top:0, height:50, zIndex: 1, display: 'flex', width: '100%' }}>CallMeKevTheDev</h1>
      <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
      {/* <EffectComposer> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        <Shanty />
        <AmbientSound />
        <fog attach="fog" args={['#ddc1c6', 65, 90]} /> {/* color, near, far */}
        <Environment files="./img/sky.hdr" background />
        <Suspense fallback={<Loader />}>
          <spotLight position={[25, 50, 50]} angle={Math.PI / 3} penumbra={1} castShadow shadow-mapSize-height={4096} shadow-mapSize-width={4096} intensity={0.4} />
          <Physics>
            <Game />
          </Physics>
          <Stats />
        </Suspense>
        {/* </EffectComposer> */}
      </Canvas>
    </>
  )
}
