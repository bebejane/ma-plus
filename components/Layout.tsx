import s from './Layout.module.scss'
import React, { useEffect, useState } from 'react'
import type { MenuItem } from '/lib/menu'
import { buildMenu } from '/lib/menu'
import { useRouter } from 'next/router'
import { Grid, Menu } from '/components'
import useStore from '/lib/store'

export type LayoutProps = {
	children: React.ReactNode
	menu: MenuItem[]
	title: string
}

export default function Layout({ children, menu: menuFromProps }: LayoutProps) {

	const router = useRouter()
	const [menu, setMenu] = useState<MenuItem[]>(menuFromProps)

	useEffect(() => { // Refresh menu on load.
		buildMenu().then(res => setMenu(res)).catch(err => console.error(err))
	}, [router.locale])

	return (
		<>
			<Menu items={menu} />
			<Grid />
		</>
	)
}