interface VinylRecordProps {
  size?: number;
  className?: string;
  delay?: string;
}

export default function VinylRecord({ 
  size = 96, 
  className = '',
  delay = '0s'
}: VinylRecordProps) {
  return (
    <div 
      className={`animate-rotate-slow ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-red-500/40"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="50" cy="50" r="12" fill="currentColor"/>
        <circle cx="50" cy="50" r="6" fill="#0a0a0a"/>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos((i * Math.PI) / 4)}
            y2={50 + 35 * Math.sin((i * Math.PI) / 4)}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
      </svg>
    </div>
  );
}

