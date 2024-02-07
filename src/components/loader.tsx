import { ComponentPropsWithoutRef } from 'react';

const bars = Array(12).fill(0);

interface LoaderProps extends ComponentPropsWithoutRef<'div'> {
	visible: boolean;
}

export const Loader = ({ visible, ...rest }: LoaderProps) => {
	return (
		<div {...rest} className='loader-wrapper' data-visible={visible}>
			<div className='loader-spinner'>
				{bars.map((_, i) => (
					<div className='loader-bar' key={`spinner-bar-${i}`} />
				))}
			</div>
		</div>
	);
};
