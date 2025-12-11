export default function FloatingOrbs() {
  return (
    <>
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-float"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-float" 
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />
    </>
  );
}

