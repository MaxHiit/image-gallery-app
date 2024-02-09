import { ComponentPropsWithoutRef, useState } from 'react';

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

interface UploadDialogWrapperProps extends ComponentPropsWithoutRef<'div'> {}

const UploadDialogWrapper = ({ children }: UploadDialogWrapperProps) => {
	return (
		<div className='bg-secondary border border-input max-w-3xl w-fit max-h-min fixed z-20 bottom-6 left-1/2 -translate-x-1/2 rounded-md p-2 cursor cursor-pointer'>
			{children}
		</div>
	);
};

export const UploadDialog = () => {
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const isDesktop = useMediaQuery('(min-width: 768px)');

	const handleCloseModal = () => {
		setFiles([]);
	};

	if (isDesktop) {
		return (
			<UploadDialogWrapper>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant='ghost'>Upload yours picture</Button>
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
			</UploadDialogWrapper>
		);
	}

	return (
		<UploadDialogWrapper>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button variant='ghost'>Upload yours picture</Button>
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
		</UploadDialogWrapper>
	);
};
