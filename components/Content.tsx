import s from './Content.module.scss'
import cn from 'classnames'
import React from 'react'
import useStore from '/lib/store'

export type ContentProps = {
	children: React.ReactNode
}

export default function Content({ children }: ContentProps) {

	const [showMenu] = useStore((state) => [state.showMenu])

	return (
		<main id="content" className={cn(s.content, !showMenu && s.full)}>
			{children}
		</main>
	)
}