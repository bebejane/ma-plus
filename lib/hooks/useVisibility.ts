'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export type VisibilityState = {
	id?: string;
	ratio: number;
	step: number;
	wasVisible: boolean;
	wasPassed: boolean;
	isVisible: boolean;
	direction: 'in' | 'out' | 'none';
};

const initialState: VisibilityState = {
	ratio: 0,
	step: 0,
	wasVisible: false,
	wasPassed: false,
	isVisible: false,
	direction: 'none',
};

const useVisibility = (id: string, threshold = 0, steps = 100): [(node?: Element) => void, VisibilityState] => {
	const [state, setState] = useState<VisibilityState>({ id, ...initialState });
	const { ref, inView, entry } = useInView({
		trackVisibility: true,
		delay: 100,
		threshold: threshold || new Array(steps).fill(0).map((x, t) => t / steps),
	});
	const { intersectionRatio: ratio, intersectionRect: pos, boundingClientRect: bounds } = entry || {};

	useEffect(() => {
		if (ratio === undefined) return;
		setState({
			id,
			ratio,
			step: Math.ceil(ratio * steps),
			isVisible: ratio > 0,
			wasVisible: state.wasVisible || ratio ? true : false,
			wasPassed: state.wasPassed || ratio >= 0.9 ? true : false,
			direction: bounds.top < 0 ? 'out' : 'in',
		});
	}, [ratio]);

	return [ref, state];
};

export default useVisibility;
