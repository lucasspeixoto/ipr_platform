import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
	Avatar,
	Box,
	Button,
	Divider,
	Hidden,
	lighten,
	List,
	ListItem,
	ListItemText,
	Popover,
	Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

import { useAuth } from '@hooks/useAuth';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import { useMembers } from '@hooks/useMembers';
import ChurchIcon from '@mui/icons-material/Church';

const UserBoxButton = styled(Button)(
	({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
	({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
	({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
	({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
	({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

export const HeaderUserbox = () => {
	const { user, logout } = useAuth();
	const { activeMember } = useMembers();

	const ref = useRef<any>(null);
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	return (
		<>
			<UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
				<Avatar variant='rounded' alt={user.name} src={user.photoUrl} />
				<Hidden mdDown>
					<UserBoxText>
						<UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
						<UserBoxDescription variant='body2'>
						{activeMember?.ecclesiastical?.craft || ''}
						</UserBoxDescription>
					</UserBoxText>
				</Hidden>
				<Hidden smDown>
					<ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
				</Hidden>
			</UserBoxButton>
			<Popover
				anchorEl={ref.current}
				onClose={handleClose}
				open={isOpen}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuUserBox sx={{ minWidth: 210 }} display='flex'>
					<Avatar variant='rounded' alt={user.name} src={user.photoUrl} />
					<UserBoxText>
						<UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
						<UserBoxDescription variant='body2'>
							{activeMember?.ecclesiastical?.craft || ''}
						</UserBoxDescription>
					</UserBoxText>
				</MenuUserBox>
				<Divider sx={{ mb: 0 }} />
				<List sx={{ p: 1 }} component='nav'>
					<ListItem button to='/registration/resume' component={NavLink}>
						<AccountBoxTwoToneIcon fontSize='small' />
						<ListItemText primary='Meu Perfil' />
					</ListItem>
					<ListItem button to='/registration/personal' component={NavLink}>
						<ContactPhoneIcon fontSize='small' />
						<ListItemText primary='Pessoais' />
					</ListItem>
					<ListItem button to='/registration/supplementary' component={NavLink}>
						<PersonIcon fontSize='small' />
						<ListItemText primary='Complementares' />
					</ListItem>
					<ListItem
						button
						to='/registration/ecclesiastical'
						component={NavLink}
					>
						<ChurchIcon fontSize='small' />
						<ListItemText primary='Eclesiásticos' />
					</ListItem>
				</List>
				<Divider />
				<Box sx={{ m: 1 }}>
					<Button color='primary' fullWidth onClick={logout}>
						<LockOpenTwoToneIcon sx={{ mr: 1 }} />
						Sair
					</Button>
				</Box>
			</Popover>
		</>
	);
};
