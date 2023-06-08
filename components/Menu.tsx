import s from './Menu.module.scss'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Menu, MenuItem } from '/lib/menu'
import { pathToSectionId } from '/lib/menu'
import Link from 'next/link'
import useStore from '/lib/store'
import useDevice from '/lib/hooks/useDevice'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'

export type MenuProps = { items: Menu, contact: ContactRecord }

export default function Menu({ items, contact }: MenuProps) {

  const router = useRouter()
  const { asPath } = router
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [hovering, setHovering] = useState(false)
  const [selected, setSelected] = useState<MenuItem | undefined>()
  const [selectedSub, setSelectedSub] = useState<MenuItem | undefined>()
  const { scrolledPosition, isScrolledUp } = useScrollInfo()
  const { isMobile, isTablet, isDesktop } = useDevice()

  const blurBackground = scrolledPosition > 0 //&& isDesktop
  const hideInactiveMenuItems = scrolledPosition > 0 && isDesktop && !hovering

  const handleClick = (ev) => {

    const item = items.find(item => item.id === ev.currentTarget.id)

    if ((ev.target as HTMLElement).tagName !== 'A') {
      const sSub = selectedSub?.id === item.id ? undefined : item
      setSelectedSub(sSub)

      const r = document.querySelector<HTMLElement>(':root')
      const sectionId = pathToSectionId(asPath)
      r.style.setProperty('--section-color', `var(--${sSub ? item.id : sectionId ?? 'home'}-color)`);
    }
  }

  useEffect(() => {
    const handleRouteChangeComplete = (path: string) => {
      setSelectedSub(undefined)
      setShowMenu(false)
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [])

  useEffect(() => {
    setSelected(items.find(item => item.id === pathToSectionId(asPath)))
  }, [asPath])

  useEffect(() => {
    if (hideInactiveMenuItems)
      setSelectedSub(undefined)
  }, [hideInactiveMenuItems])

  return (
    <>
      <nav
        className={cn(s.menu, !showMenu && s.hide, blurBackground && s.background)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className={s.logo}>
          <Link href={'/'}>
            <span className="logo">
              MA+
            </span>
          </Link>
        </div>

        <div className={s.burger} onClick={() => setShowMenu(!showMenu)}>
          {!showMenu ? 'Menu' : 'Stäng'}
        </div>

        <ul ref={menuRef} className={cn(showMenu && s.show)}>
          {items.map((item, idx) => {
            const isSelected = selected?.id === item.id
            const isSubSelected = selectedSub?.id === item.id

            return (
              <li
                id={item.id}
                key={idx}
                onClick={handleClick}
                className={cn(
                  isSelected && !selectedSub && s.selected,
                  selectedSub && isSelected && s.inactive,
                  isSubSelected && s[item.id],
                  (hideInactiveMenuItems && !isSelected) && s.hidden
                )}
              >
                {item.slug ?
                  <Link href={item.slug}>{item.label}</Link>
                  :
                  <span>{item.label}</span>
                }

                {isSubSelected &&
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
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}