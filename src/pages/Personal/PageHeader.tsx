import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

export const PageHeader = () => {
	return (
		<Grid container justifyContent='space-between' alignItems='center'>
			<Grid item>
				<Typography variant='h3' component='h3' gutterBottom>
					Dados pessoais
				</Typography>
				<Typography variant='subtitle2'>
					Preencha com atenção os seus dados pessoais
				</Typography>
			</Grid>
			<Grid item>
				<Button
					sx={{ mt: { xs: 2, md: 0 } }}
					variant='contained'
					startIcon={<AddTwoToneIcon fontSize='small' />}
				>
					Salvar
				</Button>
			</Grid>
		</Grid>
	);
};