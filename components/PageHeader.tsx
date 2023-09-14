import s from './PageHeader.module.scss'
import cn from 'classnames'
import useStore from '/lib/store'
type Props = {
  children: string
}

export default function PageHeader({ children }: Props) {

  const [hidePageHeader] = useStore((state) => [state.hidePageHeader])

  return (
    <h3 className={cn(s.header, hidePageHeader ? s.hide : '')}>
      {children}
    </h3>

  )
}