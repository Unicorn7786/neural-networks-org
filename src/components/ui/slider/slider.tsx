import * as React from "react"

interface SliderProps {
  value: number[]
  max?: number
  step?: number
  className?: string
  onValueChange?: (value: number[]) => void
}

export function Slider({ value, max = 100, step = 1, className, onValueChange }: SliderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    onValueChange?.([newValue])
  }

  return (
    <input
      type="range"
      min="0"
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  )
}