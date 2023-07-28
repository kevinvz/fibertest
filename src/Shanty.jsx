
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { PositionalAudio } from '@react-three/drei'

const Shanty = () => {
    const sound = useLoader(THREE.AudioLoader, './sound/shanty.mp3')

    return (
      <PositionalAudio
        url="./sound/shanty.mp3"
        ref={sound}
        loop={true}
        distance={100}
        volume={0.01} // Adjust the volume as needed
        autoplay
      />
    );
  };
  

export default Shanty;