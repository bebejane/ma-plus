import styles from "./Reveal.module.scss"
import React, { ReactElement } from "react";
import cn from 'classnames'
import useVisibility from "/lib/hooks/useVisibility";

const effects = {
  fade: {
    duration: 2500,
    fade: 0.0,
    delay: 2.3
  },
  fadeUp: {
    duration: 1500,
    transform: 'translateY',
    distance: 5,
    direction: '+',
    unit: 'vh',
    fade: 0.0,
    delay: 0.3
  },
  slideInLeft: {
    duration: 1000,
    transform: 'translateX',
    distance: 100,
    direction: '-',
    unit: 'px',
    fade: 0.0,
    delay: 0.3
  },
  slideInRight: {
    duration: 1000,
    transform: 'translateX',
    distance: 100,
    direction: '+',
    unit: 'px',
    fade: 0.0,
    delay: 0.3
  },
  zoomIn: {
    duration: 1000,
    transform: 'scale',
    distance: 0.9,
    direction: '',
    unit: '',
    fade: 1,
    delay: 0.3
  }
}

export type Effect = {
  duration: number
  fade: number
  delay: number
  transform?: 'translateX' | 'translateY' | 'scale'
  distance?: number
  direction?: '+' | '-'
  unit?: 'px' | '%'

}

export type Props = {
  effect: keyof typeof effects
  duration?: number
  distance?: number
  delay?: number
  fade?: number
  steps?: number
  threshhold?: number
  children: React.ReactNode | React.ReactNode[]

}

export default function Reveal(props: Props) {

  const effect: Effect | undefined = effects[props.effect] && styles[props.effect] ? effects[props.effect] : undefined
  if (!effect) return <div>{`Effect "${props.effect}" doesn't exist!`}</div>

  const { steps = 100, threshhold = 0 } = props
  const duration = props.duration ?? effect.duration
  const distance = Math.abs(props.distance || effect.distance)
  const delay = props.delay !== undefined ? props.delay : effect.delay
  const fade = props.fade !== undefined ? props.fade : effect.fade

  const [visRef, { ratio, wasVisible }] = useVisibility('', threshhold, steps);
  const effectClass = ratio > 0 || wasVisible ? styles[props.effect] : undefined

  const style = {
    animationDuration: `${(duration) / 1000}s`,
    animationDelay: `${(delay) / 1000}s`,
    transform: effect.transform ? `${effect.transform}(${effect.direction}${distance}${effect.unit})` : undefined,
    opacity: fade
  }

  return (
    <>
      {React.Children.map(props.children, (child: ReactElement, idx) => {
        const p = {
          ref: idx === 0 ? visRef : null,
          ...child.props,
          className: cn(effectClass, child.props.className),
          style
        }
        return React.cloneElement(child, p)
      })
      }
    </>
  )
};