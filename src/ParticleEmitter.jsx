import React, { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from "three";
import smokePuff from './resources/puff.png'


const ParticleEmitter = () => {
    const [pointsSize, setPointsSize] = useState(1)
    const particleTexture = useLoader(THREE.TextureLoader, smokePuff)
    console.log('particle texture : ', particleTexture)
    const particleGroup = useRef();
    const particles = useRef();
  
    useEffect(() => {
      const emitter = particleGroup.current;
      const particleSystem = particles.current;
  
      const totalParticles = 500;
      const particlePositions = new Float32Array(totalParticles * 3);
      const particleVelocities = new Float32Array(totalParticles * 3);
      const particleOpacities = new Float32Array(totalParticles);
  
      for (let i = 0; i < totalParticles; i++) {
        const index = i * 3;
        particlePositions[index] = Math.random() * 3 - 0.1; // X position
        particlePositions[index + 1] = -1.5; // Y position (start at the bottom)
        particlePositions[index + 2] = Math.random() * 3 - 0.1; // Z position
  
        particleVelocities[index] = 0;
        particleVelocities[index + 1] = 0.05 + Math.random() * 0.01; // Y velocity
        particleVelocities[index + 2] = 0;
  
        particleOpacities[i] = Math.random(); // Random opacity
      }
  
      particleSystem.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
      );
  
      particleSystem.geometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(particleVelocities, 3)
      );
  
      particleSystem.geometry.setAttribute(
        "opacity",
        new THREE.BufferAttribute(particleOpacities, 1)
      );
  
      emitter.add(particleSystem);
  
      return () => {
        emitter.remove(particleSystem);
      };

      setPointsSize(Math.random() * 5)
    }, []);
  
    useFrame(() => {
      if (particles.current) {
        const positions = particles.current.geometry.attributes.position.array;
        const velocities = particles.current.geometry.attributes.velocity.array;
  
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];
  
          // Reset particles when they go too high
          if (positions[i + 1] > 50) {
            positions[i] = Math.random() * 3 - 0.1;
            positions[i + 1] = -1.5;
            positions[i + 2] = Math.random() * 3 - 0.1;
          }
        }
  
        particles.current.geometry.attributes.position.needsUpdate = true;
      }
    });
  
    return (
      <group ref={particleGroup} position = {[30,15,29]}>
        <points ref={particles}>
        <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position" //attribute parameter yang akan dikontrol
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={particleTexture}
        color={0x435368}
        size={15}
        sizeAttenuation //merupakan parameter yang menscale object berdasarkan perspective camera
        transparent={true}
        alphaTest={0.5} //merupakan thresshold saat rendering untuk mencega bila opacity dibawah value alphatest
        opacity={0.7}
      />
         
        </points>
      </group>
    );
  };
  
  export default ParticleEmitter;
