import s from './Loader.module.scss'
import cn from 'classnames'

type Props = {
  message?: string
  loading?: boolean
  className?: string
  color?: string
  invert?: boolean
  size?: number
}

export default function Loader({ loading = true, className, invert = false }: Props) {
  if (!loading) return null

  return (
    <div className={cn(s.container, className, invert && s.invert)}>
      Loading...
    </div>
  )
}