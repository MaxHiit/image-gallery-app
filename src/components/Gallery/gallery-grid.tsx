'use client';

import type { UploadsRecord } from '@/xata';
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zoom } from '@/components/zoom-image';

interface GalleryGridProps {
	images: UploadsRecord[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
	if (images.length === 0) {
		return (
			<div className='min-h-[58.8vh] md:h-[68.3dvh] flex items-center justify-center'>
				<p>No images</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 min-h-screen'>
			{images.map((image) => (
				<div key={image.key}>
					<Zoom>
						<div className='relative h-[400px] md:h-[300px]'>
							<Image
								className='w-full h-full object-cover object-top rounded-lg '
								fill
								sizes='100vw'
								src={image.url ?? ''}
								alt={image.name ?? ''}
								placeholder='blur'
								blurDataURL={image.url ?? ''}
								loading='lazy'
							/>
						</div>
					</Zoom>
					<Button
						variant='outline'
						title='Download this image'
						className='mt-4 flex items-center w-full'
						onClick={() => saveAs(image.url ?? '', image.name ?? '')}
					>
						<Download className='size-4 mr-2' aria-hidden='true' />
						<span>Dowload</span>
					</Button>
				</div>
			))}
		</div>
	);
};
