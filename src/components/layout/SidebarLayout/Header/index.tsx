import { useContext } from 'react';
import { Box, Hidden, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { SidebarContext } from '@contexts/SidebarContext';
import { useAuth } from '@hooks/useAuth';

const HeaderWrapper = styled(Box)(
	({ theme }) => `
		height: ${theme.header.height};
		color: ${theme.header.textColor};
		padding: ${theme.spacing(0, 2)};
		right: 0;
		z-index: 5;
		background-color: ${theme.header.background};
		box-shadow: ${theme.header.boxShadow};
		position: fixed;
		justify-content: space-between;
		width: 100%;
		@media (min-width: ${theme.breakpoints.values.lg}px) {
				left: ${theme.sidebar.width};
				width: auto;
		}
`,
);

function Header() {
	const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

	const { logout } = useAuth();

	return (
		<HeaderWrapper display='flex' alignItems='center'>
			<Box display='flex' alignItems='center'>
				<Typography variant='h3'>Graça e paz Irmão(ã) Lucas</Typography>
			</Box>
			<Box display='flex' alignItems='center'>
				<Tooltip arrow title='Sair'>
					<IconButton color='primary' onClick={() => logout()}>
						<LogoutIcon />
					</IconButton>
				</Tooltip>
				<Hidden lgUp>
					<Tooltip arrow title='Toggle Menu'>
						<IconButton color='primary' onClick={toggleSidebar}>
							{!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
						</IconButton>
					</Tooltip>
				</Hidden>
			</Box>
		</HeaderWrapper>
	);
}

export default Header;
