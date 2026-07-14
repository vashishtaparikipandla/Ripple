interface RippleLogoProps {
  size?: number
  className?: string
}

export default function RippleLogo({ size = 28, className = '' }: RippleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ripple logo"
    >
      {/* Main flame body */}
      <path
        d="M16 2C13.5 5 10 9.5 10 14.5C10 18.5 12.8 22 16.5 22.2C16.2 20 17.2 17.5 19.5 15.5C19.5 15.5 18.2 19 20.5 21C22 19.5 23 17.5 23 15.5C23 10.5 19.5 6 16 2Z"
        fill="#E8431A"
      />
      {/* Lower secondary flame */}
      <path
        d="M15 18C13.8 20 13 21.5 13 23.5C13 26 14.8 28 17 28C19.2 28 21 26 21 23.5C21 21 19 18.5 19 18.5L15 18Z"
        fill="#E8431A"
        opacity="0.65"
      />
    </svg>
  )
}
