import Image from 'next/image';

export const Header = () => {
	return (
		<header>
			<nav className='min-w-full py-5 px-8 border border-b-2'>
				<div className='flex items-center space-x-3 rtl:space-x-reverse'>
					<div className='relative w-8 h-8'>
						<Image
							src='https://flowbite.com/docs/images/logo.svg'
							fill
							sizes='(min-width: 808px) 50vw, 100vw'
							alt='Image upload Logo'
						/>
					</div>
					<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
						ImageUpload
					</span>
				</div>
			</nav>
		</header>
	);
};
