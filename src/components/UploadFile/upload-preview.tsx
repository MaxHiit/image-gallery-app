import { Button } from '@/components/ui/button';
import { FileWithPreview } from '@/types';
import { TrashIcon, X } from 'lucide-react';
import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

interface UploadPreviewProps {
	files: FileWithPreview[];
	setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
}

export const UploadPreview = ({ files, setFiles }: UploadPreviewProps) => {
	// Revoke preview url and reset files state when component unmounts
	useEffect(() => {
		return () => {
			if (!files) return;
			files.forEach((file) => URL.revokeObjectURL(file.preview));
			setFiles([]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!files.length) return null;

	return (
		<div className='p-4 md:p-0 md:my-4'>
			<div className='relative grid grid-cols-[repeat(auto-fit,minmax(70px,1fr))] gap-x-4'>
				{files.map((file, i) => (
					<div key={file?.name + i} className='relative aspect-square max-h-28'>
						<Image
							src={file.preview}
							alt={file.name}
							className='object-cover object-center rounded-md'
							sizes='100vw'
							fill
						/>
						<Button
							type='button'
							variant='outline'
							size='icon'
							className='absolute -top-2 -right-2 size-5 rounded-full'
							onClick={() => {
								if (!files) return;
								setFiles(files.filter((_, j) => j !== i));
							}}
						>
							<X className='size-3' aria-hidden='true' />
							<span className='sr-only'>Remove file</span>
						</Button>
					</div>
				))}
			</div>
			{files?.length && files?.length >= 2 ? (
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='mt-2.5 w-full'
					onClick={() => setFiles([])}
				>
					<TrashIcon className='mr-2 size-4' aria-hidden='true' />
					Remove All
					<span className='sr-only'>Remove all</span>
				</Button>
			) : null}
		</div>
	);
};
