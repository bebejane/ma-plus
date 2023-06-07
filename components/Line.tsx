import s from './Line.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { pathToSectionId } from '/lib/menu'
type Props = {

}

export default function Line({ }: Props) {
  const router = useRouter()
  const sectionId = pathToSectionId(router.asPath)

  return <hr className={cn(s.line, s[sectionId])} />
}