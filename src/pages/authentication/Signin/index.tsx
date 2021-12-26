import { useContext, useState } from 'react';

import Paper from '@mui/material/Paper';

import LoginBackground from '@assets/bg-sign-in-basic.jpeg';

import { Button, TextField } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';

import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';
import { useAuth } from '@hooks/useAuth';
import { ILoginData } from '@core/types/ILogin.model';
import { Error } from '@core/helpers/ErrorMessages';

import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Copyright } from './../Copyright';
import { AuthButton } from '../AuthButton';
import { ThemeSwitch } from '@components/layout/SidebarLayout/Toggle';

import { ThemeContext } from '@core/config/theme/schemes/ThemeProvider';

const LoginWithGoogleButton = styled(Button)(
	({ theme }) => `
      font-size: 15px;
      box-shadow: ${theme.colors.shadows.primary};
			border: none;
      .MuiButton-endIcon {
        color: ${theme.palette.error.contrastText}
      },
`,
);

const AuthBackgroundImage = styled(props => (
	<Grid item container xs={false} sm={4} md={8} {...props} />
))(({ theme }) => ({
	backgroundImage: `url(${LoginBackground})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const schema = yup
	.object({
		email: yup
			.string()
			.required(Messages.required)
			.matches(
				/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
				Messages.invalidemail,
			),
		password: yup
			.string()
			.trim()
			.required(Messages.required)
			.min(5, Messages.min),
	})
	.required();

export const Signin: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginData>({
		resolver: yupResolver(schema),
	});

	const { user, signInWithGoogle, signInWithEmailAndPassword } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const loginWithEmailAndPassword = async (data: ILoginData) => {
		const { email, password } = data;

		try {
			await signInWithEmailAndPassword(email, password);
		} catch (error) {
			const code: string = error.code;
			alert(Error[code]);
		}
	};

	const loginWithGoogle = () => {
		if (!user) {
			signInWithGoogle();
		}
	};

	const { themeName, setThemeName } = useContext(ThemeContext);

	const [darkTheme, setDarkTheme] = useState(() =>
		themeName === 'NebulaFighterTheme' ? true : false,
	);

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
			<Helmet>
				<title>Login</title>
			</Helmet>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<AuthBackgroundImage />

				<Grid item xs={12} sm={8} md={4} component={Paper} square>
					<ThemeSwitch checked={darkTheme} onChange={handleChangeTheme} />

					<Box
						sx={{
							my: 6,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography variant='h1'>Login</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit(loginWithEmailAndPassword)}
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email'
								name='email'
								autoComplete='email'
								autoFocus
								{...register('email')}
								error={errors.email?.message !== undefined}
								helperText={errors.email?.message}
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								label='Senha'
								type={showPassword ? 'text' : 'password'}
								id='password'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
								autoComplete='current-password'
								{...register('password')}
								error={errors.password?.message !== undefined}
								helperText={errors.password?.message}
							/>

							<AuthButton label='Entrar' icon={<LoginIcon />} />

							<LoginWithGoogleButton
								variant='contained'
								color='secondary'
								type='button'
								fullWidth
								endIcon={<GoogleIcon />}
								onClick={() => loginWithGoogle()}
								sx={{ mt: 3, mb: 2 }}
							>
								Login com Google
							</LoginWithGoogleButton>
							<Grid container>
								<Grid item xs>
									<Typography
										variant='h6'
										sx={{ cursor: 'pointer' }}
										component={RouterLink}
										to='/forgot-password'
									>
										Esqueceu a senha ?
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant='h6'
										sx={{ cursor: 'pointer' }}
										component={RouterLink}
										to='/signup'
									>
										Criar Conta
									</Typography>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 15 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};
