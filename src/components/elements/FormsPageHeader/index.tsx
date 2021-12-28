import React from 'react';
import { Typography, Grid } from '@mui/material';

interface FormsPageHeaderProps {
  title: string;
  subtitle: string;
}

export const FormsPageHeader: React.FC<FormsPageHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Grid>
      {/* <Grid item>
				<Button
					sx={{ mt: { xs: 2, md: 0 } }}
					variant='contained'
					startIcon={<AddTwoToneIcon fontSize='small' />}
				>
					Salvar
				</Button>
			</Grid> */}
    </Grid>
  );
};
