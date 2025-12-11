export default function GradientMesh() {
  return (
    <>
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.15)_0%,_transparent_50%)]"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.08)_0%,_transparent_50%)]"
        aria-hidden="true"
      />
    </>
  );
}

