import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import useStore from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'

export type MenuProps = { items: Menu, contact: ContactRecord }

export default function Menu({ items, contact }: MenuProps) {

  const router = useRouter()
  const { asPath } = router
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState<MenuItem | undefined>()
  const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()

  return (
    <>
      <nav className={cn(s.menu, !showMenu && s.hide)}>
        <div className={s.logo}>
          <Link href={'/'}>
            <span className="logo">
              MA+
            </span>
          </Link>
        </div>
        <ul ref={menuRef}>
          {items.map((item, idx) =>
            <li key={idx} onClick={() => setSelected(item)} className={cn(selected?.id === item.id && s.selected)}>
              {item.slug ? <Link href={item.slug}>{item.label}</Link> : item.label}
            </li>
          )}
        </ul>
        {selected &&
          <div className={s.sub}>
            {selected.id === 'contact' &&
              <>
                {contact.address}&nbsp;
                <a href={`mailto:${contact.email}`}>{contact.email}</a>&nbsp;
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </>
            }
            {selected.id === 'what-we-do' &&
              <ul>
                {items.find(item => item.id === 'what-we-do')?.sub.map((item, idx) =>
                  <li>
                    <Link href={item.slug}>{item.label}</Link>
                  </li>
                )}
              </ul>
            }
          </div>
        }
      </nav>
    </>
  )
}