import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const SpinnerBox = styled(Box)(
	({ theme }) => `
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	backgroundColor: ${theme.colors.primary.main};
`,
);

export const SuspenseLoader: React.FC = () => {
	useEffect(() => {
		NProgress.start();

		return () => {
			NProgress.done();
		};
	}, []);

	return (
		<SpinnerBox display='flex' alignItems='center' justifyContent='center'>
			<CircularProgress size={100} disableShrink thickness={4} />
		</SpinnerBox>
	);
};
