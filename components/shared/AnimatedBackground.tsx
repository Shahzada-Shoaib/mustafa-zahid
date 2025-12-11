import FloatingOrbs from './FloatingOrbs';
import GradientMesh from './GradientMesh';
import NoiseTexture from './NoiseTexture';
import GridPattern from './GridPattern';
import MusicalNotes from './MusicalNotes';
import SoundWaves from './SoundWaves';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <GradientMesh />
      <FloatingOrbs />
      <NoiseTexture />
      <GridPattern />
      <MusicalNotes count={8} />
      <SoundWaves 
        position="bottom-left"
        count={5}
        color="red"
      />
      <SoundWaves 
        position="top-right"
        count={4}
        color="amber"
      />
    </div>
  );
}

