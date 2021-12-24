import { Box, Hidden, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import WarehouseIcon from '@mui/icons-material/Warehouse';

const LogoWrapper = styled(Link)(
	({ theme }) => `
    color: ${theme.palette.text.primary};
    padding: ${theme.spacing(0, 1, 0, 0)};
    display: flex;
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
`,
);

const LogoTextWrapper = styled(Box)(
	({ theme }) => `
    padding-left: ${theme.spacing(1)};
`,
);

const VersionBadge = styled(Box)(
	({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    font-size: ${theme.typography.pxToRem(15)};
`,
);

const LogoText = styled(Box)(
	({ theme }) => `
    font-size: ${theme.typography.pxToRem(20)};
    font-weight: ${theme.typography.fontWeightBold};
`,
);

function Logo() {
	return (
		<LogoWrapper to='/'>
			<WarehouseIcon color='primary' fontSize='large' sx={{ mt: 1 }} />
			<Hidden smDown>
				<LogoTextWrapper>
					<Tooltip title='Versão 2.0.0' arrow placement='right'>
						<VersionBadge>2.0.0</VersionBadge>
					</Tooltip>
					<LogoText>Plataforma IPR</LogoText>
				</LogoTextWrapper>
			</Hidden>
		</LogoWrapper>
	);
}

export default Logo;
