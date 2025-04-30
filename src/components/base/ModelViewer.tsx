
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/perfume.glb");
  return <primitive object={scene} scale={0.25} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-[500px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Model />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
