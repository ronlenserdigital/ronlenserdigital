"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  el?: React.ElementType
  once?: boolean
  delay?: number
}

export default function AnimatedText({
  text,
  className,
  el: Wrapper = "p",
  once = true,
  delay = 0,
}: AnimatedTextProps) {
  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  }

  return (
    <Wrapper className={cn("overflow-hidden", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        aria-hidden
        className="block"
      >
        {text.split(" ").map((word, wordIndex) => (
          <span className="inline-block" key={`${word}-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block"
                variants={defaultAnimations}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
