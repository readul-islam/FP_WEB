interface FocusPilotLogoProps {
  size?: number;
  className?: string;
  /** "icon" = icon only, "full" = icon + wordmark, "small" = compact header */
  variant?: "icon" | "full" | "small";
  /** "default" = green on dark/light, "white" = all white (for green/colored bg) */
  scheme?: "default" | "white";
}

const FocusPilotLogo = ({
  size = 40,
  className = "",
  variant = "full",
  scheme = "default",
}: FocusPilotLogoProps) => {
  const isWhite = scheme === "white";

  // Token colors
  const ringColor   = isWhite ? "#FFFFFF" : "#10B981";
  const innerRing   = isWhite ? "rgba(255,255,255,0.4)" : "#64748b";
  const arrowFill   = isWhite ? "#FFFFFF" : "#10B981";
  const dotFill     = "#FFFFFF";
  const textPrimary = isWhite ? "#FFFFFF" : undefined; // undefined → inherits text-foreground

  const Icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer focus ring — two-arc with gaps */}
      <circle
        cx="50" cy="50" r="42"
        stroke={ringColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="180 80"
      />
      {/* Inner dashed orbit */}
      <circle
        cx="50" cy="50" r="28"
        stroke={innerRing}
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.3"
      />
      {/* Navigation / compass arrow */}
      <path d="M50 24L72 70L50 60L28 70L50 24Z" fill={arrowFill} />
      {/* Centre dot */}
      <circle cx="50" cy="50" r="4" fill={dotFill} />
    </svg>
  );

  if (variant === "icon") return <span className={className}>{Icon}</span>;

  const textSize    = variant === "small" ? "text-base" : "text-xl";
  const taglineSize = variant === "small" ? "text-[8px]" : "text-[9px]";
  const gap         = variant === "small" ? "gap-1.5" : "gap-2.5";

  return (
    <span className={`inline-flex items-center ${gap} ${className}`}>
      {Icon}
      <span className="flex flex-col leading-none">
        <span
          className={`${textSize} font-bold tracking-tight`}
          style={{ color: textPrimary }}
        >
          {/* "Focus" inherits text-foreground; "pilot" always brand green */}
          <span className={isWhite ? "text-white" : "text-foreground"}>Focus</span>
          <span style={{ color: ringColor }}>pilot</span>
        </span>
        {variant === "full" && (
          <span
            className={`${taglineSize} font-mono tracking-[0.18em] uppercase`}
            style={{ color: ringColor, opacity: 0.7 }}
          >
            Navigate Success
          </span>
        )}
      </span>
    </span>
  );
};

export default FocusPilotLogo;
