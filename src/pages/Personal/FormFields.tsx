import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	MenuItem,

} from '@mui/material';


const sexOptions: string[] = ['Masculino', 'Feminino'];

export const FormFields: React.FC = () => {
	return (
		<Card>
			<CardHeader title='Informações' />
			<Divider />
			<CardContent>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '50ch' },
					}}
					noValidate
					autoComplete='off'
				>
					<div>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='Nome Completo'
							name='name'
							autoComplete='name'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='sex'
							select
							label='Sexo'
						>
							{sexOptions.map(option => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id='date'
							label='Data de Nascimento'
							type='date'
							defaultValue='2021-12-24'
							sx={{ width: 220 }}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<div>
						<TextField
							required
							id='filled-required'
							label='Required'
							defaultValue='Hello World'
							variant='filled'
						/>
						<TextField
							disabled
							id='filled-disabled'
							label='Disabled'
							defaultValue='Hello World'
							variant='filled'
						/>
						<TextField
							id='filled-password-input'
							label='Password'
							type='password'
							autoComplete='current-password'
							variant='filled'
						/>
						<TextField
							id='filled-read-only-input'
							label='Read Only'
							defaultValue='Hello World'
							InputProps={{
								readOnly: true,
							}}
							variant='filled'
						/>
						<TextField
							id='filled-number'
							label='Number'
							type='number'
							InputLabelProps={{
								shrink: true,
							}}
							variant='filled'
						/>
						<TextField
							id='filled-search'
							label='Search field'
							type='search'
							variant='filled'
						/>
						<TextField
							id='filled-helperText'
							label='Helper text'
							defaultValue='Default Value'
							helperText='Some important text'
							variant='filled'
						/>
					</div>
					<div>
						<TextField
							required
							id='standard-required'
							label='Required'
							defaultValue='Hello World'
							variant='standard'
						/>
						<TextField
							disabled
							id='standard-disabled'
							label='Disabled'
							defaultValue='Hello World'
							variant='standard'
						/>
						<TextField
							id='standard-password-input'
							label='Password'
							type='password'
							autoComplete='current-password'
							variant='standard'
						/>
						<TextField
							id='standard-read-only-input'
							label='Read Only'
							defaultValue='Hello World'
							InputProps={{
								readOnly: true,
							}}
							variant='standard'
						/>
						<TextField
							id='standard-number'
							label='Number'
							type='number'
							InputLabelProps={{
								shrink: true,
							}}
							variant='standard'
						/>
						<TextField
							id='standard-search'
							label='Search field'
							type='search'
							variant='standard'
						/>
						<TextField
							id='standard-helperText'
							label='Helper text'
							defaultValue='Default Value'
							helperText='Some important text'
							variant='standard'
						/>
					</div>
				</Box>
			</CardContent>
		</Card>
	);
};
