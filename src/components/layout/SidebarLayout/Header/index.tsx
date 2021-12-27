import { useContext, useState } from 'react';
import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { SidebarContext } from '@contexts/SidebarContext';
import { useAuth } from '@hooks/useAuth';
import { ThemeSwitch } from '../Toggle';
import { ThemeContext } from '@core/config/theme/schemes/ThemeProvider';
import { HeaderUserbox } from './UserBox';
import { Notifications } from './Notifications';

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

export const Header = () => {
	const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

	const { themeName, setThemeName } = useContext(ThemeContext);

	const [darkTheme, setDarkTheme] = useState(() =>
		themeName === 'NebulaFighterTheme' ? true : false,
	);

	const { user } = useAuth();

	const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDarkTheme(event.target.checked);
		if (darkTheme) {
			setThemeName('PureLightTheme');
		} else {
			setThemeName('NebulaFighterTheme');
		}
	};

	return (
		<>
			{user && (
				<HeaderWrapper display='flex' alignItems='center'>
					<Box display='flex' alignItems='center'>
						<ThemeSwitch checked={darkTheme} onChange={handleChangeTheme} />
					</Box>
					<Box display='flex' alignItems='center'>
						<Notifications />
						<HeaderUserbox />
						<Hidden lgUp>
							<Tooltip arrow title='Toggle Menu'>
								<IconButton color='primary' onClick={toggleSidebar}>
									{!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
								</IconButton>
							</Tooltip>
						</Hidden>
					</Box>
				</HeaderWrapper>
			)}
		</>
	);
};
