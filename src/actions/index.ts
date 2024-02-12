'use server';

import { getXataClient } from '@/xata';
import { revalidatePath } from 'next/cache';

const xata = getXataClient();

export async function getImages() {
	const record = await xata.db.uploads.getAll();
	return record;
}

export async function addImages(data: any) {
	await xata.db.uploads.create(data);

	revalidatePath('/');
}
