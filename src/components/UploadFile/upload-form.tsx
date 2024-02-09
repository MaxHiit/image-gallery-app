'use client';

import { useUploadThing } from '@/lib/uploadthing';
import { imagesUploadSchema } from '@/lib/validations/images-upload';
import { FileWithPreview } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { generatePermittedFileTypes } from 'uploadthing/client';
import { z } from 'zod';
import { UploadInput } from '@/components/UploadFile';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	UncontrolledFormMessage
} from '@/components/ui/form';
import { MAX_FILE, MAX_FILE_SIZE } from '@/constants';

type Inputs = z.infer<typeof imagesUploadSchema>;

interface UploadFormProps {
	files: FileWithPreview[];
	setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadForm = ({ files, setFiles, setOpen }: UploadFormProps) => {
	const { isUploading, startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
		onClientUploadComplete: () => {
			toast.dismiss();
			toast.success('Successfully uploaded');

			setOpen(false);
		},
		onUploadError: () => {
			toast.dismiss();
			toast.error('Upload failed');
		}
	});

	const { fileTypes } = generatePermittedFileTypes(permittedFileInfo?.config);

	const form = useForm<Inputs>({
		resolver: zodResolver(imagesUploadSchema),
		defaultValues: {
			images: []
		}
	});

	const onSubmit = async (data: Inputs) => {
		try {
			if (data.images.length > 0) {
				toast.loading('Uploading images...');
				const response = await startUpload(data.images);
				// const result = response?.map((image) => ({
				// 	id: image.key,
				// 	name: image.key.split('_')[1] ?? image.key,
				// 	url: image.url
				// }));

				// 	// add server action database
			}

			form.reset();
			setFiles([]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='px-4 md:px-0'>
				<FormLabel htmlFor='images' className='sr-only'>
					Upload files
				</FormLabel>
				<FormItem>
					<FormControl>
						<UploadInput
							setValue={form.setValue}
							fileTypes={fileTypes}
							name='images'
							maxSize={MAX_FILE_SIZE}
							maxFiles={MAX_FILE}
							files={files}
							setFiles={setFiles}
							isUploading={isUploading}
							disabled={isUploading || files?.length === MAX_FILE}
						/>
					</FormControl>
					<UncontrolledFormMessage message={form.formState.errors.images?.message} />
				</FormItem>

				<Button className='w-full mt-4 space-x-3' type='submit' disabled={isUploading}>
					{isUploading && <Loader visible={isUploading} aria-hidden='true' />}
					<span>Upload Images</span>
					<span className='sr-only'>Add Images</span>
				</Button>
			</form>
		</Form>
	);
};
