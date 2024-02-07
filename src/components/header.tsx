import React from 'react';
import { Moon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Header = () => {
	return (
		<header>
			<nav className='min-w-full flex flex-wrap items-center justify-between mx-auto py-5 px-8 border border-b-2'>
				<a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<div className='relative w-8 h-8'>
						<Image
							src='https://flowbite.com/docs/images/logo.svg'
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							alt='Flowbite Logo'
						/>
					</div>
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						ImageUpload
					</span>
				</a>
				<Button variant='secondary'>
					<Moon className='h-4 w-4' />
				</Button>
			</nav>
		</header>
	);
};
