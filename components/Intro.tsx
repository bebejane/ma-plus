import s from './Intro.module.scss'
import cn from 'classnames'
import { useState, useEffect } from 'react'

type Props = {

}

const steps = ['start', 'text', 'end']
const types = ['Art', 'Architecture', 'Alternatives']
const making = 'Making'

const delay = 500

export default function Intro({ }: Props) {

  const [index, setIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [step, setStep] = useState(steps[index])
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (index <= steps.length - 1)
      setStep(steps[index])
  }, [index])

  if (finished) return null

  return (
    <div onClick={() => setFinished(true)} className={cn(s.container, step === 'end' && s.end)} onAnimationEnd={() => step === 'end' && setTimeout(() => setFinished(true), delay)}>
      <div className={cn(s.line, s.v, s[step])} />
      <div className={cn(s.line, s.h, s[step])} onAnimationEnd={() => {
        if (step === 'end') return
        setIndex(index + 1)
      }} />
      {index > 0 && step === 'text' &&
        <h1>
          {making.split('').map((c, i) =>
            <span key={i}>{c}</span>
          )}
          &nbsp;
          {types[textIndex]?.split('').map((c, i) =>
            <span
              key={`${i}-${textIndex}`}
              className={s.c}
              style={{ animationDelay: `${i * 0.1}s` }}
              onAnimationEnd={() => {
                if (i !== types[textIndex].split('').length - 1) return
                if (textIndex < types.length - 1)
                  setTimeout(() => setTextIndex(textIndex + 1), delay)
                else if (textIndex === types.length - 1)
                  setTimeout(() => setIndex(index + 1), delay)
              }}
            >{c}</span>
          )}
        </h1>
      }
    </div>
  )
}