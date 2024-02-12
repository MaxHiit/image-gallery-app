import { Suspense } from 'react';
import { getImages } from '@/actions';
import { GalleryHeader, GalleryGrid } from '@/components/Gallery';
import { Loader } from '@/components/loader';

export default async function Home() {
	const images = await getImages();

	return (
		<main className='min-h-full px-8 py-5 md:max-w-[1500px] mx-auto space-y-4'>
			<GalleryHeader images={images} />
			<Suspense fallback={<Loader visible={true} />}>
				<GalleryGrid images={images} />
			</Suspense>
		</main>
	);
}
