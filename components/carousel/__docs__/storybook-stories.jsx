import React from 'react';
import { storiesOf } from '@storybook/react';

import Carousel from '~/components/carousel';
import Card from '~/components/card';
import { carouselItems } from '~/components/carousel/__examples__/carousel-items';
import { CAROUSEL } from '../../../utilities/constants';
import Default from '../__examples__/default';

storiesOf(CAROUSEL, module)
	.addDecorator((getStory) => (
		<div
			style={{
				bottom: '1rem',
				left: '1rem',
				overflow: 'auto',
				position: 'absolute',
				right: '1rem',
				top: '1rem',
			}}
		>
			{getStory()}
		</div>
	))
	.add('Default With 1 Item', () => <Default itemsPerPanel={1} hasNavigation />)
	.add('Default Without Navigation Indicators', () => <Default />)
	.add('Default With 5 Items', () => (
		<Default itemsPerPanel={5} hasNavigation />
	))
	.add('With Card Items', () => {
		const itemsComponents = carouselItems.map((item) => <Card>{item}</Card>);
		return (
			<div style={{ width: '100%', maxWidth: '100%' }}>
				<Carousel itemsPerPanel={3} items={itemsComponents} />
			</div>
		);
	});
