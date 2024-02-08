'use client';

import { UploadDialog } from '@/components/UploadFile';
import { useEffect, useState } from 'react';

export const UploadModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return <UploadDialog />;
};
