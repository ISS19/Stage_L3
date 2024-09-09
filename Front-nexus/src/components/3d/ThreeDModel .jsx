import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function ThreeDModel({ voice, concatenatedDescriptions, animationComplete , ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/face.glb');
  const { actions } = useAnimations(animations, group);
  const [scale, setScale] = useState(12.393);

  useEffect(() => {
    // Play animation only when both voice and concatenatedDescriptions are true
    if (voice && concatenatedDescriptions && actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.play();
    } else {
      // Stop animation if the conditions are not met
      Object.values(actions).forEach(action => action.stop());
    }
  }, [actions, voice, concatenatedDescriptions]);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 768) {
        setScale(10);
      } else if (window.innerWidth <= 1200) {
        setScale(10);
      } else {
        setScale(12.393);
      }
    };

    if (animationComplete && actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.paused = true;  // Correctly pause the action by setting its paused property to true
    }
    
    window.addEventListener('resize', updateScale);
    updateScale();

    return () => window.removeEventListener('resize', updateScale);
  }, [animationComplete]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={scale}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="grp_eyeLeft_1"
                position={[-0.027, 0.031, 0.025]}
                rotation={[1.69, -0.2, 0.039]}
                scale={0.01}
              >
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
                scale={0.01}
              >
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
              <group
                name="grp_transform_6"
                rotation={[1.598, -0.202, -0.02]}
                scale={0.01}
              >
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
  );
}

useGLTF.preload('/face.glb');
