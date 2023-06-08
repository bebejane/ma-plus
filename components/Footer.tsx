import s from './Footer.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { pathToSectionId } from '/lib/menu'

type Props = {
  contact: ContactRecord
}

export default function Footer({ contact }: Props) {

  const router = useRouter()
  const sectionId = pathToSectionId(router.asPath)

  return (
    <footer className={cn(s.footer, s[sectionId])}>
      <h3>
        <span>{contact.address}</span>
        <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
        <span><a href={`tel:${contact.phone}`}>{contact.phone}</a></span>
      </h3 >
    </footer >
  )
}