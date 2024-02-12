import { cn, formatBytes } from '@/lib/utils';
import { FileWithPreview } from '@/types';
import { UploadIcon } from 'lucide-react';
import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { useCallback, useEffect } from 'react';
import type { Accept, FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import type { FieldPath, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';
import { generateClientDropzoneAccept } from 'uploadthing/client';

interface FileDialogProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends HTMLAttributes<HTMLDivElement> {
	name: TName;
	setValue: UseFormSetValue<TFieldValues>;
	accept?: Accept;
	maxSize?: number;
	maxFiles?: number;
	files: FileWithPreview[];
	setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
	isUploading?: boolean;
	fileTypes: string[];
	disabled?: boolean;
}

export const UploadInput = <TFieldValues extends FieldValues>({
	name,
	accept,
	maxSize = 1024 * 1024 * 2,
	maxFiles = 1,
	files,
	setFiles,
	setValue,
	fileTypes,
	isUploading = false,
	disabled = false,
	className,
	...props
}: FileDialogProps<TFieldValues>) => {
	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
			if (files.length + acceptedFiles.length > maxFiles) {
				toast.warning('Too many files');
				return;
			}

			acceptedFiles.forEach((file) => {
				const fileWithPreview = Object.assign(file, {
					preview: URL.createObjectURL(file)
				});

				setFiles((prev) => [...(prev ?? []), fileWithPreview]);
			});

			if (rejectedFiles.length > 0) {
				rejectedFiles.forEach(({ errors }) => {
					if (errors[0]?.code === 'file-exist') {
						toast.warning(errors[0].message);
						return;
					}
				});
			}
		},
		[setFiles, files, maxFiles]
	);

	const handleExistingFile = (file: FileWithPath) => {
		if (files.some((uploadedFile) => file.name === uploadedFile.name)) {
			return {
				code: 'file-exist',
				message: 'File already exist'
			};
		}
		return null;
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
		maxFiles,
		multiple: maxFiles > 1,
		disabled,
		validator: handleExistingFile
	});

	// Register files to react-hook-form
	useEffect(() => {
		setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	return (
		<div>
			<div
				{...getRootProps()}
				className={cn(
					'group relative grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
					'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					isDragActive && 'border-muted-foreground/50',
					disabled && 'pointer-events-none opacity-60',
					className
				)}
				{...props}
			>
				<input {...getInputProps({ name })} />
				{isUploading ? (
					<div className='group grid w-full place-items-center gap-1 sm:px-10'>
						<UploadIcon className='size-9 animate-pulse text-muted-foreground' aria-hidden='true' />
					</div>
				) : isDragActive ? (
					<div className='grid place-items-center gap-2 text-muted-foreground sm:px-5'>
						<UploadIcon className={cn('size-8', isDragActive && 'animate-bounce')} aria-hidden='true' />
						<p className='text-base font-medium'>Drop the file here</p>
					</div>
				) : (
					<div className='grid place-items-center gap-1 sm:px-5'>
						<UploadIcon className='size-8 text-muted-foreground' aria-hidden='true' />
						<p className='mt-2 text-base font-medium text-muted-foreground'>
							Drag {`'n'`} drop file here, or click to select file
						</p>
						<p className='text-sm text-slate-500'>
							Please upload file with size less than {formatBytes(maxSize)}
						</p>
						<p className='text-sm text-slate-500'>
							<em>
								(You can drop maximum {maxFiles} {maxFiles === 1 ? 'file' : 'files'} at once)
							</em>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
