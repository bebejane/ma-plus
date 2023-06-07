import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import Link from 'next/link'
import useStore from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'

export type MenuProps = { items: Menu }

export default function Menu({ items }: MenuProps) {


  const router = useRouter()
  const { locale, defaultLocale, asPath } = router
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState<MenuItem | undefined>()
  const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()

  return (
    <>
      <nav className={cn(s.menu, !showMenu && s.hide)}>
        <div className={s.logo}>
          <span className="logo">
            MA+
          </span>
        </div>
        <ul ref={menuRef}>
          {items.map((item, idx) =>
            <li key={idx}>
              {item.slug ? <Link href={item.slug}>{item.label}</Link> : item.label}
            </li>
          )}
        </ul>
        <ul className={s.sub}>
          <li>sub</li>
        </ul>
      </nav>
    </>
  )
}