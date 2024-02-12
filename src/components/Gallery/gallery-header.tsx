'use client';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import type { UploadsRecord } from '@/xata';
import { UploadDialog } from '@/components/UploadFile';
import { Button } from '@/components/ui/button';

interface GalleryHeaderProps {
	images: UploadsRecord[];
}

export const GalleryHeader = ({ images }: GalleryHeaderProps) => {
	const handleDownload = async () => {
		const zip = new JSZip();

		await Promise.all(
			images.map(async (image, index) => {
				if (image.url) {
					try {
						const response = await fetch(image.url);
						const blob = await response.blob();
						zip.file(`${image.name || `image-${index}`}`, blob);
					} catch (error) {
						console.error('Error downloading image:', error);
					}
				}
			})
		);

		try {
			const content = await zip.generateAsync({ type: 'blob' });
			saveAs(content, 'images.zip');
		} catch (error) {
			console.error('Error generating zip file:', error);
		}
	};

	return (
		<div className='sticky top-0 z-10 bg-background py-3 flex flex-col items-center justify-between md:flex-row space-y-3 md:space-y-0 md:space-x-4'>
			<div className='w-full md:w-fit'>
				<UploadDialog />
			</div>
			<Button
				variant='outline'
				className='w-full md:w-fit'
				onClick={handleDownload}
				disabled={images.length < 1}
			>
				Download all
			</Button>
		</div>
	);
};
