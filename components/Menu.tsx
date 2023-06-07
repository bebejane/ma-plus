import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import { pathToSectionId } from '/lib/menu'
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
  const [selectedSub, setSelectedSub] = useState<MenuItem | undefined>()
  const { scrolledPosition, documentHeight, viewportHeight } = useScrollInfo()

  useEffect(() => {
    const handleRouteChangeComplete = (path: string) => setSelectedSub(undefined)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [])

  useEffect(() => {
    setSelected(items.find(item => item.id === pathToSectionId(asPath)))
  }, [asPath])
  console.log(items)
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
            <li
              key={idx}
              onClick={(ev) => (ev.target as HTMLElement).tagName !== 'A' && setSelectedSub(selectedSub?.id === item.id ? undefined : item)}
              className={cn(selected?.id === item.id && s.selected, selectedSub?.id === item.id && s.selectedSub)}
            >
              {item.slug ?
                <Link href={item.slug}>{item.label}</Link>
                :
                <span>{item.label}</span>
              }
            </li>
          )}
        </ul>
        {selectedSub &&
          <div className={s.sub}>
            {selectedSub.id === 'contact' &&
              <ul>
                <li>{contact.address}</li>
                <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
                <li><a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
              </ul>
            }
            {selectedSub.id === 'what-we-do' &&
              <ul>
                {items.find(item => item.id === 'what-we-do')?.sub.map((item, idx) =>
                  <li className={cn(asPath === item.slug && s.selected)}>
                    <Link href={item.slug}>
                      {item.label}
                    </Link>
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