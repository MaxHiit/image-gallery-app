import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { formatBytes } from '@/lib/utils';
import { z } from 'zod';

export const imagesUploadSchema = z.object({
	images: z
		.array(z.instanceof(File))
		.min(1, 'At least one file is required')
		.refine((files) => {
			return files.every((file) => file.size <= MAX_FILE_SIZE);
		}, `The maximum image size is ${formatBytes(MAX_FILE_SIZE)}`)
		.refine((files) => {
			return files.every((file) => ACCEPTED_FILE_TYPES.includes(file.type));
		}, '.jpg, .jpep and .png files are accepted')
});
