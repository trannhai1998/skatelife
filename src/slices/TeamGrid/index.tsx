import React, { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { Bounded } from '@/app/components/Bounded';
import { Heading } from '@/app/components/Heading';
import { createClient } from '@/prismicio';
import Skater from './Skater';
import SlideIn from '@/app/components/SlideIn';

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
	const client = createClient();
	const skaters = await client.getAllByType('skater');

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-texture bg-brand-navy">
			<SlideIn>
				<Heading
					as="h2"
					size="lg"
					className="mb-8 text-center text-white">
					<PrismicRichText field={slice.primary.heading} />
				</Heading>
			</SlideIn>

			<div className="grid gird-cols-1 gap-8 md:grid-cols-4">
				{skaters.map((skater, index) => (
					<React.Fragment key={index}>
						{skater.data.first_name && (
							<SlideIn>
								<Skater index={index} skater={skater}></Skater>
							</SlideIn>
						)}
					</React.Fragment>
				))}
			</div>
		</Bounded>
	);
};

export default TeamGrid;
