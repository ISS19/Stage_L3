"use client";
import { ThreeDModel } from "@/components/3d/ThreeDModel ";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const HomePage = () => (
  <div>
    <h1>Modèle 3D en Next.js</h1>
    <div style={{width: "1000px", height: "1000px"}}>
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Environment preset="studio" />
      <OrbitControls />
      <ThreeDModel />
    </Canvas>
    </div>
  </div>
);

export default HomePage;
