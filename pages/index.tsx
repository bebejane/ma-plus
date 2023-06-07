import "swiper/css";
import "swiper/css/effect-fade"
import s from './index.module.scss'
import cn from 'classnames'
import withGlobalProps from '/lib/withGlobalProps'
import type { GetStaticProps } from 'next'
import { StartDocument, AllWhatTypesDocument } from '/graphql';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade } from 'swiper'
import type { Swiper as SwiperType } from 'swiper'
import { Image } from 'react-datocms';
import { useRef, useState, useEffect } from "react";
import { Loader } from "/components";
import { DatoMarkdown } from "dato-nextjs-utils/components";
import Link from "next/link";

SwiperCore.use([EffectFade]);

export type Props = { site: Site, start: StartRecord, whats: WhatRecord[] }

export default function Home({ start, whats }: Props) {

	const images = [start.imageCityPlanning, start.imageCulturePolitics, start.imageOrganizationDevelopment, start.imageTexts]

	const swiperRef = useRef<SwiperType | undefined>()
	const [index, setIndex] = useState(0)
	const [loaded, setLoaded] = useState<any>({})

	return (
		<div className={s.container}>
			<div className={s.whats}>
				<Swiper
					id={`main-gallery`}
					loop={true}
					spaceBetween={0}
					centeredSlides={true}
					slidesPerView={1}
					initialSlide={0}
					effect="fade"
					onSlideChange={({ realIndex }) => setIndex(realIndex)}
					onSwiper={(swiper) => swiperRef.current = swiper}
				>
					{images.map((image, idx) =>
						<SwiperSlide key={idx} className={s.slide}>
							<figure>
								<Image
									className={s.image}
									pictureClassName={s.picture}
									data={image.responsiveImage}
									lazyLoad={true}
									usePlaceholder={false}
									onLoad={() => setLoaded((l) => ({ ...l, [image.id]: true }))}
									fadeInDuration={0}
								/>
								{!loaded[image.id] &&
									<div className={s.loading}><Loader /></div>
								}
								<figcaption>
									{image.title}
								</figcaption>
							</figure>
						</SwiperSlide>
					)}
				</Swiper>
				<nav>
					<h3>Vad vi gör</h3>
					<ul className={s.whatTypes}>
						{whats.map((what, i) =>
							<li key={i} className={cn("intro", index === i && s.selected)} onClick={() => swiperRef.current.slideTo(i + 1)}>
								{what.title}
							</li>
						)}
					</ul>
				</nav>
			</div>
			<div className={s.about}>
				<h3>Om oss</h3>
				<div className="intro">
					<DatoMarkdown>{start.text}</DatoMarkdown>
				</div>
				<Link className="mid" href="/om-oss">Läs mer om oss</Link>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = withGlobalProps({ queries: [StartDocument, AllWhatTypesDocument] }, async ({ props, revalidate }: any) => {

	return {
		props,
		revalidate
	};
});
