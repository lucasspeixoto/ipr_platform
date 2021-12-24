import Typography, { TypographyProps } from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = (props: TypographyProps) => {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link
				color='primary'
				target='_blank'
				href='https://www.igrejapentecostalreformada.com.br/'
			>
				Igreja Pentecostal Reformada
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};
