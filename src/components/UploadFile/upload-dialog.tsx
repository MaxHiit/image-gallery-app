import { useState } from 'react';
import { UploadIcon } from 'lucide-react';

import { UploadForm, UploadPreview } from '@/components/UploadFile';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/useMediaQuery';
import { FileWithPreview } from '@/types';

export const UploadDialog = () => {
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const isDesktop = useMediaQuery('(min-width: 768px)');

	const handleCloseModal = () => {
		setFiles([]);
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant='default'>
						<UploadIcon className='size-4 mr-2' aria-hidden='true' />
						<span>Upload</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload your file</DialogTitle>
					</DialogHeader>
					<UploadPreview files={files} setFiles={setFiles} />
					<UploadForm files={files} setFiles={setFiles} setOpen={setOpen} />
					<DialogFooter className='sm:justify-start'>
						<DialogClose asChild>
							<Button variant='outline' className='w-full' onClick={handleCloseModal}>
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant='default' className='w-full'>
					<UploadIcon className='size-4 mr-2' aria-hidden='true' />
					<span>Upload</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>Upload your file</DrawerTitle>
				</DrawerHeader>
				<UploadPreview files={files} setFiles={setFiles} />
				<UploadForm files={files} setFiles={setFiles} setOpen={setOpen} />
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline' className='w-full' onClick={handleCloseModal}>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
