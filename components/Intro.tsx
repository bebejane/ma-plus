import s from './Intro.module.scss'
import cn from 'classnames'
import { useState, useEffect, useRef, cloneElement } from 'react'
import useStore from '/lib/store'
import { useRouter } from 'next/router'
import { pathToSectionId } from '/lib/menu'
import { sleep } from 'dato-nextjs-utils/utils'
import useDevice from '/lib/hooks/useDevice'

type Props = {

}

const steps = ['start', 'text', 'end']
const types = ['Art', 'Architecture', 'Alternatives']
const making = 'Making'

const delay = 700

export default function Intro({ }: Props) {

  const [index, setIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(-1)
  const [step, setStep] = useState(steps[index])
  const [introFinished, setIntroFinished] = useStore((state) => [state.introFinished, state.setIntroFinished])
  const router = useRouter()
  const sectionId = pathToSectionId(router.asPath)
  const { isMobile } = useDevice()

  useEffect(() => {
    if (index <= steps.length - 1)
      setStep(steps[index])
  }, [index])

  useEffect(() => {

    const animateTypes = async () => {
      await sleep(delay)
      await animateLogo()
    }

    const animateLogo = async () => {


      const logo = document.getElementById('logo')
      const header = document.getElementById('intro-header')

      const ma = document.querySelectorAll('#intro-header > span > span:first-child')
      const other = document.querySelectorAll('#intro-header > span > span:not(:first-child)')
      const speed = 400

      header.style.top = header.getBoundingClientRect().top + 'px'
      header.style.transition = `all ${speed}ms ease-in-out`
      header.style.position = 'fixed'
      header.style.transform = 'translateY(0%)'

      ma.forEach((o) => o.classList.add(s.expandletter, 'logo'))
      other.forEach((o) => o.classList.add(s.hideletter))

      header.style.margin = '0'
      header.style.padding = '0'
      header.style.left = logo.getBoundingClientRect().left + 'px'
      header.style.top = `calc(${logo.getBoundingClientRect().top + 'px'})`
      setStep('end')
      await sleep(speed / 2)

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
      <div className={cn(s.line, s.h, s[step])} onAnimationEnd={() => step !== 'end' && setIndex(index + 1)} />
      {index > 0 && (step === 'text' || (step === 'end')) &&
        <h1 id="intro-header" className="logo">
          MAA Studio
        </h1>
      }
    </div>
  )
}