import s from './Intro.module.scss'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import useStore from '/lib/store'
import { useRouter } from 'next/router'
import { pathToSectionId } from '/lib/menu'
import { sleep } from 'dato-nextjs-utils/utils'

type Props = {

}

const steps = ['start', 'text', 'end']
const types = ['Art', 'Architecture', 'Alternatives']
const making = 'Making'

const delay = 800

export default function Intro({ }: Props) {

  const [index, setIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(-1)
  const [step, setStep] = useState(steps[index])
  const [introFinished, setIntroFinished] = useStore((state) => [state.introFinished, state.setIntroFinished])
  const router = useRouter()
  const sectionId = pathToSectionId(router.asPath)

  useEffect(() => {
    if (index <= steps.length - 1)
      setStep(steps[index])
  }, [index])

  useEffect(() => {

    const animateTypes = async () => {
      for (let i = 0; i < types.length; i++) {
        await sleep(delay)
        setTextIndex(i)
      }
      await sleep(delay)
      setStep('end')
    }

    if (step === 'text')
      animateTypes()

  }, [step])


  if (introFinished) return null

  return (
    <div
      onClick={() => setIntroFinished(true)}
      className={cn(s.container, s[sectionId], step === 'end' && s.end)}
      onAnimationEnd={() => step === 'end' && setTimeout(() => setIntroFinished(true), 1000)}
    >
      <div className={cn(s.line, s.v, s[step], s[sectionId])} />
      <div className={cn(s.line, s.h, s[step])} onAnimationEnd={() => {
        if (step === 'end') return
        setIndex(index + 1)
      }} />
      {index > 0 && step === 'text' &&
        <h1>
          <span>Making</span>
          <span className={s.c}>{types?.[textIndex]}</span>
        </h1>
      }
    </div>
  )
}