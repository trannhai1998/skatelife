import { FC } from 'react';
import { Content } from '@prismicio/client';
import {
	PrismicRichText,
	PrismicText,
	SliceComponentProps,
} from '@prismicio/react';

import { Bounded } from '@/app/components/Bounded';
import { Heading } from '@/app/components/Heading';
import { ButtonLink } from '@/app/components/ButtonLink';
import { WideLogo } from './WideLogo';
import { TallLogo } from './TallLogo';
import InteractiveSkateboard from './InteractiveSkateboard';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture">
			<div className="absolute inset-0 flex items-center pt-20">
				<WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block " />
				<TallLogo className="w-full text-brand-purple block opacity-20 mix-blend-multiply lg:hidden " />
			</div>

			<div className="grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
				<Heading
					size="lg"
					className="relative max-w-2xl place-self-start">
					<PrismicText field={slice.primary.heading} />
				</Heading>

				<div className="flex relative flex-col items-center justify-between ~gap-2/4 lg:flex-row w-full">
					<div className="font-semibold max-w-[45ch] ~text-lg/xl">
						<PrismicRichText field={slice.primary.body} />
					</div>
					<ButtonLink
						field={slice.primary.button}
						icon="skateboard"
						size="lg"
						className="z-20 mt-2 block">
						{slice.primary.button.text}
					</ButtonLink>
				</div>
			</div>

			<InteractiveSkateboard></InteractiveSkateboard>
		</Bounded>
	);
};

export default Hero;
