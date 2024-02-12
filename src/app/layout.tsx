import { Header } from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ImageUpload',
	description:
		'Upload image is a web application that allows you to share, upload and view photos of your event.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Toaster position='top-center' />
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
