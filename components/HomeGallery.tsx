'use client';

import 'swiper/css';
import 'swiper/css/effect-fade';
import s from './HomeGallery.module.scss';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import { Image } from 'react-datocms';
import { Loader } from '@/components';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import useStore from '@/lib/store';

SwiperCore.use([EffectFade, Autoplay]);

export type Props = {
	whats: AllWhatTypesQuery['whats'];
	start: StartQuery['start'];
};

export default function HomeGallery({ whats, start }: Props) {
	const images = [
		start.imageCityPlanning,
		start.imageCulturePolitics,
		start.imageOrganizationDevelopment,
		start.imageTexts,
	];
	const [introFinished] = useStore((state) => [state.introFinished]);
	const swiperRef = useRef<SwiperType | null>(null);
	const [index, setIndex] = useState(0);
	const [loaded, setLoaded] = useState<any>({});

	useEffect(() => {
		if (introFinished && swiperRef.current) setTimeout(() => swiperRef.current?.autoplay?.start(), 2000);
	}, [introFinished]);

	return (
		<div className={s.homeGallery}>
			<Swiper
				id={`main-gallery`}
				loop={true}
				spaceBetween={0}
				centeredSlides={true}
				slidesPerView={1}
				initialSlide={0}
				autoplay={!introFinished ? false : { delay: 2000, disableOnInteraction: true }}
				effect='fade'
				onSlideChange={({ realIndex }) => setIndex(realIndex)}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
			>
				{images.map((image, idx) => (
					<SwiperSlide key={idx} className={s.slide}>
						<figure>
							<Image
								className={s.image}
								imgClassName={s.picture}
								data={image.responsiveImage}
								usePlaceholder={false}
								fadeInDuration={0}
								onLoad={() => setLoaded((l) => ({ ...l, [image.id]: true }))}
							/>
							{!loaded[image.id] && (
								<div className={s.loading}>
									<Loader />
								</div>
							)}
							<figcaption>{image.title}</figcaption>
						</figure>
					</SwiperSlide>
				))}
			</Swiper>
			<nav>
				<h3>Vad vi gör</h3>
				<ul className={s.whatTypes}>
					{whats.map((what, i) => (
						<li
							key={i}
							className={cn('intro', index === i && s.selected)}
							onMouseEnter={() => swiperRef.current.slideTo(i + 1)}
						>
							<Link href={`/vad-vi-gor/${what.slug}`}>{what.title}</Link>
						</li>
					))}
				</ul>
			</nav>
			<ul className={s.pagination}>
				{images.map((image, i) => (
					<li key={i} className={cn(i === index && s.selected)} onClick={() => swiperRef.current.slideTo(i + 1)}>
						<span>•</span>
					</li>
				))}
			</ul>
		</div>
	);
}
