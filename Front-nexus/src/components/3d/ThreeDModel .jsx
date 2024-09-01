import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function ThreeDModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/face.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play the first animation found
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={5.393}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="grp_eyeLeft_1"
                position={[-0.027, 0.031, 0.025]}
                rotation={[1.69, -0.2, 0.039]}
                scale={0.01}>
                <group name="eyeLeft_0">
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
              <group
                name="grp_eyeRight_3"
                position={[0.038, 0.018, 0.024]}
                rotation={[1.69, -0.205, -0.025]}
                scale={0.01}>
                <group name="eyeRight_2">
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
              <group name="grp_transform_6" rotation={[1.598, -0.202, -0.02]} scale={0.01}>
                <group name="head_4">
                  <mesh
                    name="mesh_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_2.geometry}
                    material={materials.lambert5}
                    morphTargetDictionary={nodes.mesh_2.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_2.morphTargetInfluences}
                  />
                </group>
                <group name="teeth_5">
                  <mesh
                    name="Object_13"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/face.glb')
