
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { PositionalAudio } from '@react-three/drei'

const AmbientSound = () => {
    const sound = useLoader(THREE.AudioLoader, './sound/ambient.mp3')

    return (
      <PositionalAudio
        url="./sound/ambient.mp3"
        ref={sound}
        loop={true}
        distance={100}
        volume={0.01} // Adjust the volume as needed
        autoplay
      />
    );
  };
  

export default AmbientSound;