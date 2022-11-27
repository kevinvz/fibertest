/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/scene-1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['house_water-2'].geometry} material={nodes['house_water-2'].material} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/scene-1.glb')
