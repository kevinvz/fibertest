import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Object3D } from 'three'

export default function useFollowCam() {
  const { scene, camera } = useThree()

  const pivot = useMemo(() => new Object3D(), [])
  const followCam = useMemo(() => {
    const o = new Object3D()
    o.position.set(0, 10 , 1.5)
    return o
  }, [])

  const onDocumentMouseMove = (e) => {
    if (document.pointerLockElement) {
      pivot.rotation.y -= e.movementX * 0.002
      const v = followCam.rotation.x - e.movementY * 0.002
      if (v >= -2.0 && v <= 0.4 && followCam.rotation.x >= -0.35) {
        followCam.rotation.x = v
      }
      // console.log('follow cam rot x :', followCam.rotation.x)
      // console.log('follow cam poz y :', followCam.position.y)
    }
    return false
  }

  const onDocumentMouseWheel = (e) => {
    if (document.pointerLockElement) {
      const v = followCam.position.z + e.deltaY * 0.002
      if (v >= 0.5 && v <= 4) {
        followCam.position.z = v
      }
      console.log('follow cam poz z :', followCam.position.z)
    }
    return false
  }

  useEffect(() => {
    camera.position.set(0, 0, 0)
    followCam.add(camera)
    pivot.add(followCam)
    scene.add(pivot)
    followCam.position.z = 6
    // followCam.rotation.x = -0.3
    followCam.position.y = 5
    //console.log('attach followCam listeners')
    document.addEventListener('mousemove', onDocumentMouseMove)
    // document.addEventListener('mousewheel', onDocumentMouseWheel)
    //console.log(followCam)
    return () => {
      //console.log('remove followCam listeners')
      document.removeEventListener('mousemove', onDocumentMouseMove)
      document.removeEventListener('mousewheel', onDocumentMouseWheel)
    }
  })

  return { pivot }
}
