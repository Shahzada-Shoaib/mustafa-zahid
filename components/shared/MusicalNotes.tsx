interface MusicalNotesProps {
  count?: number;
  size?: number;
  color?: string;
  className?: string;
}

export default function MusicalNotes({ 
  count = 8, 
  size = 40,
  color = "red-500/30",
  className = ""
}: MusicalNotesProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-music-note ${className}`}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 3)}s`
          }}
          aria-hidden="true"
        >
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`text-${color}`}
            aria-hidden="true"
          >
            <path 
              d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" 
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </>
  );
}

