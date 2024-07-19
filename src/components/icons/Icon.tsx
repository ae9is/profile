export interface IconProps {
  fill?: string
  stroke?: string
  className?: string
  viewBox?: string
  width?: string

  // Pass through the SVG <path>s for the specific icon
  svgPaths?: React.ReactNode
}

export function Icon(props: IconProps) {
  const {
    fill = 'currentColor',
    stroke = 'none',
    className = 'w-4 h-4 align-text-bottom',
    viewBox = '0 0 16 16',
    width = '16',
    svgPaths,
  } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      role="img"
      width={width}
      version="1.1"
      data-view-component="true"
      viewBox={viewBox}
      strokeWidth={1}
      stroke={stroke}
      className={className}
    >
      {svgPaths}
    </svg>
  )
}
