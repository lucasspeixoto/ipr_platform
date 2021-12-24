import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress } from '@mui/material';

function SuspenseLoader() {
	useEffect(() => {
		NProgress.start();

		return () => {
			NProgress.done();
		};
	}, []);

	return (
		<Box
			sx={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				backgroundColor: '#111633',
			}}
			display='flex'
			alignItems='center'
			justifyContent='center'
		>
			<CircularProgress size={100} disableShrink thickness={3} />
		</Box>
	);
}

export default SuspenseLoader;
