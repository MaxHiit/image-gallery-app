import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import * as _uploadthing_shared from '@uploadthing/shared';
import { MAX_FILE } from '@/constants';

const inputConfig: _uploadthing_shared.FileRouterInputConfig = {
	'image/jpeg': { maxFileSize: '4MB', maxFileCount: MAX_FILE },
	'image/png': { maxFileSize: '4MB', maxFileCount: MAX_FILE }
};

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'user1' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f(inputConfig)
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const user = await auth(req);

			// If you throw, the user will not be able to upload
			if (!user) throw new UploadThingError('Unauthorized');

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata }) => {
			// ! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
