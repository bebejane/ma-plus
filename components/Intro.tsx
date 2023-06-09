import s from './Intro.module.scss'
import cn from 'classnames'
import { useState, useEffect } from 'react'
import useStore from '/lib/store'

type Props = {

}

const steps = ['start', 'text', 'end']
const types = ['Art', 'Architecture', 'Alternatives']
const making = 'Making'

const delay = 800

export default function Intro({ }: Props) {

  const [index, setIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [step, setStep] = useState(steps[index])
  const [introFinished, setIntroFinished] = useStore((state) => [state.introFinished, state.setIntroFinished])

  useEffect(() => {
    if (index <= steps.length - 1)
      setStep(steps[index])
  }, [index])

  if (introFinished) return null

  return (
    <div
      onClick={() => setIntroFinished(true)}
      className={cn(s.container, step === 'end' && s.end)}
      onAnimationEnd={() => step === 'end' && setTimeout(() => setIntroFinished(true), 1000)}
    >
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
          <span
            key={`${textIndex}`}
            className={s.c}
            style={{ animationDelay: textIndex === 0 ? `${delay}ms` : '0ms' }}
            onAnimationEnd={() => {
              if (textIndex < types.length - 1)
                setTextIndex(textIndex + 1)
              else if (textIndex === types.length - 1)
                setTimeout(() => setIndex(index + 1), 0)
            }}
          >{types[textIndex]}</span>

        </h1>
      }
    </div>
  )
}