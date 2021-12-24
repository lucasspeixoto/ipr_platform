import React, { useMemo, useState, createContext } from 'react';
import { ThemeProvider } from '@mui/material';

import { StylesProvider } from '@mui/styles';
import { dartThemeCreator, lightThemeCreator } from '../base';

interface IThemeContext {
	setThemeName(themeName: string): void;
	themeName: string
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProviderWrapper: React.FC = ({ children }) => {
	const lastSelectedTheme = useMemo(() => {
		return localStorage.getItem('appTheme') || 'NebulaFighterTheme';
	}, []);

	const [themeName, _setThemeName] = useState(lastSelectedTheme);

	const darkTheme = dartThemeCreator('NebulaFighterTheme');
	const lightTheme = lightThemeCreator('PureLightTheme');

	const setThemeName = (themeName: string): void => {
		localStorage.setItem('appTheme', themeName);
		_setThemeName(themeName);
	};

	return (
		<StylesProvider injectFirst>
			<ThemeContext.Provider value={{ themeName, setThemeName }}>
				<ThemeProvider
					theme={themeName === 'NebulaFighterTheme' ? darkTheme : lightTheme}
				>
					{children}
				</ThemeProvider>
			</ThemeContext.Provider>
		</StylesProvider>
	);
};

export default ThemeProviderWrapper;
