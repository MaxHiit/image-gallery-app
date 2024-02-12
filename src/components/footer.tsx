import { Github } from 'lucide-react';

export const Footer = () => {
	return (
		<footer className='bg-white rounded-lg sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased'>
			<p className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0'>
				&copy; 2024
				<a href='https://github.com/MaxHiit' className='hover:underline ml-1' target='_blank'>
					Maxhiit
				</a>
				. All rights reserved.
			</p>
			<div className='flex justify-center items-center space-x-1'>
				<a
					href='https://github.com/MaxHiit/image-gallery-app'
					target='_blank'
					className='inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600'
				>
					<Github className='w-4 h-4' aria-hidden='true' />
					<span className='sr-only'>Github</span>
				</a>
			</div>
		</footer>
	);
};
