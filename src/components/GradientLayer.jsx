import React from 'react'

const GradientLayer = ({ height, opacity, gradientId, transform = 'translateY(8px)' }) => {
  // Calculate a more solid ending opacity (not fully solid, but more opaque for smooth transition)
  const solidEndOpacity = Math.min(opacity + 0.2, 0.95) // Add 0.2 to opacity but cap at 0.95 for smooth transition
  
  // Create a wave path at the top - using different wave amplitudes for variety
  const waveAmplitude = opacity * 8 // Vary amplitude based on opacity for different wave sizes
  const waveFrequency = 0.02 // Controls wave frequency
  
  // Generate wave path
  const generateWavePath = (width, height, amplitude, frequency) => {
    let path = `M 0 ${height} L 0 ${amplitude} `
    for (let x = 0; x <= width; x += 2) {
      const y = amplitude + Math.sin(x * frequency) * amplitude
      path += `L ${x} ${y} `
    }
    path += `L ${width} ${height} Z`
    return path
  }
  
  return (
    <svg 
      className={`absolute bottom-0 left-0 w-full ${height} pointer-events-none`}
      style={{ transform }}
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="60%" stopColor={`rgba(255, 255, 255, ${opacity * 0.5})`} />
          <stop offset="85%" stopColor={`rgba(255, 255, 255, ${opacity * 0.8})`} />
          <stop offset="100%" stopColor={`rgba(255, 255, 255, ${solidEndOpacity})`} />
        </linearGradient>
      </defs>
      <path 
        d={generateWavePath(1200, 120, waveAmplitude, waveFrequency)}
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}

export default GradientLayer
