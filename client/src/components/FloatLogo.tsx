interface FloatLogoProps {
  variant?: "light" | "dark"
  height?: number
}

export default function FloatLogo({ variant = "light", height = 40 }: FloatLogoProps) {
  const wordColor = variant === "dark" ? "#0D3D39" : "#FFFFFF"
  const markColor = "#0D9488"
  const width = height * 3.6

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 144 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Float"
    >
      <circle cx="14" cy="10" r="5" fill={markColor} />
      <path
        d="M4 26 Q9 19 14 23 Q19 27 24 20"
        stroke={markColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="36"
        y="31"
        fontFamily="'Fraunces', Georgia, serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-0.5"
        fill={wordColor}
      >
        float
      </text>
    </svg>
  )
}
