interface SoundWavesProps {
  position: 'bottom-left' | 'top-right' | 'top-left' | 'bottom-right';
  count?: number;
  color?: 'red' | 'amber';
  className?: string;
}

const positionClasses = {
  'bottom-left': 'absolute bottom-20 left-10',
  'top-right': 'absolute top-32 right-16',
  'top-left': 'absolute top-20 left-10',
  'bottom-right': 'absolute bottom-32 right-16',
};

const colorClasses = {
  red: 'bg-red-500/40',
  amber: 'bg-amber-500/30',
};

export default function SoundWaves({ 
  position, 
  count = 5, 
  color = 'red',
  className = ''
}: SoundWavesProps) {
  const heights = position === 'bottom-left' 
    ? Array.from({ length: count }, (_, i) => 20 + i * 15)
    : Array.from({ length: count }, (_, i) => 15 + i * 12);
  
  const width = position === 'bottom-left' ? 'w-2' : 'w-1.5';
  const containerHeight = position === 'bottom-left' ? 'h-20' : 'h-16';

  return (
    <div 
      className={`${positionClasses[position]} flex items-end gap-1 ${containerHeight} ${className}`}
      aria-hidden="true"
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`${width} ${colorClasses[color]} rounded-t animate-sound-wave`}
          style={{
            height: `${heights[i]}px`,
            animationDelay: `${i * (position === 'bottom-left' ? 0.1 : 0.15)}s`
          }}
        />
      ))}
    </div>
  );
}

