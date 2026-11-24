"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface JoinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  className?: string
  children?: React.ReactNode
}

const WHATSAPP_URL = "https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x"

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm",
  lg: "px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base",
} as const

export function JoinButton({
  size = "md",
  className,
  children = "Join CodeNeuraX",
  onClick,
  ...props
}: JoinButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    } else {
      window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        // layout
        "group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-md",
        "bg-[#F5F5F5] text-[#050505] font-display font-semibold tracking-tight",
        "transition-[background-color,transform] duration-200 ease-out hover:bg-white",
        "active:scale-[0.98] active:duration-100",
        // a11y and state
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
        "cursor-pointer select-none disabled:pointer-events-none disabled:opacity-60",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Brief reflective highlight on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#050505]/[0.09] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[330%] motion-reduce:hidden"
      />

      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>

        {/* Small directional cue */}
        <span aria-hidden="true" className="relative block h-3.5 w-3.5 shrink-0 overflow-hidden sm:h-4 sm:w-4">
          <ArrowRight className="absolute inset-0 h-full w-full transition-transform duration-300 ease-out group-hover:translate-x-[160%] motion-reduce:transition-none" />
          <ArrowRight className="absolute inset-0 h-full w-full -translate-x-[160%] transition-transform duration-300 ease-out group-hover:translate-x-0 motion-reduce:transition-none" />
        </span>
      </span>
    </button>
  )
}

export default JoinButton