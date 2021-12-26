import React, { ChangeEvent, useState } from 'react';
import { format, parseISO } from 'date-fns';

import PropTypes from 'prop-types';
import {
	Divider,
	Box,
	FormControl,
	InputLabel,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableContainer,
	Select,
	MenuItem,
	Typography,
	CardHeader,
} from '@mui/material';

import { MemberActions } from './MemberActions';
import Label from '@components/elements/Label';
import { IMemberDetail } from '@core/types/IMemberDetail';
import { IMember } from '@core/types/IMember';

interface MemberTableProps {
	className?: string;
	members: IMember[];
}

interface Filters {
	status?: string;
}

const getStatusLabel = (memberStatus: string): JSX.Element => {
	const map = {
		failed: {
			text: 'Pendente',
			color: 'error',
		},
		completed: {
			text: 'Completo',
			color: 'success',
		},
		pending: {
			text: 'Incompleto',
			color: 'warning',
		},
	};

	const { text, color }: any = map[memberStatus];

	return <Label color={color}>{text}</Label>;
};

const applyFilters = (
	members: IMemberDetail[],
	filters: Filters,
): Filters[] => {
	return members.filter(member => {
		let matches = true;

		if (filters.status && member.status !== filters.status) {
			matches = false;
		}
		return matches;
	});
};

const applyPagination = (
	members: IMemberDetail[],
	page: number,
	limit: number,
): IMemberDetail[] => {
	return members.slice(page * limit, page * limit + limit);
};

export const MembersTable: React.FC<MemberTableProps> = ({ members }) => {
	const [selectedMemberId, setSelectedMemberId] = useState<string>(null);
	const [selectedMember, setSelectedMember] = useState<IMemberDetail>();
	const [memberIsSelected, setMemberIsSelected] = useState<boolean>(false);
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(5);
	const [filters, setFilters] = useState<Filters>({
		status: null,
	});

	const statusOptions = [
		{
			id: 'all',
			name: 'Todos',
		},
		{
			id: 'completed',
			name: 'Completo',
		},
		{
			id: 'pending',
			name: 'Incompleto',
		},
		{
			id: 'failed',
			name: 'Pendente',
		},
	];

	const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
		let value = null;
		const target = event.target.value;

		if (target !== 'all') {
			value = target;
		}

		setFilters(prevFilters => ({
			...prevFilters,
			status: value,
		}));
	};

	const handleSelectMember = (
		event: ChangeEvent<HTMLInputElement>,
		memberId: string,
		member: IMemberDetail
	): void => {
		if (selectedMemberId === memberId) {
			setSelectedMemberId(null);
			setMemberIsSelected(false);
		} else {
			setSelectedMember(member)
			setSelectedMemberId(memberId);
			setMemberIsSelected(true);
		}
	};

	const handlePageChange = (event: any, newPage: number): void => {
		setPage(newPage);
	};

	const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setLimit(parseInt(event.target.value));
	};

	const filteredMembers = applyFilters(members, filters);
	const paginatedMembers = applyPagination(filteredMembers, page, limit);

	return (
		<Card>
			{memberIsSelected && (
				<Box flex={1} p={2}>
					<MemberActions selectedMemberId={selectedMemberId} selectedMember={selectedMember}/>
				</Box>
			)}

			{!memberIsSelected && (
				<CardHeader
					action={
						<Box width={150}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel>Filtros</InputLabel>
								<Select
									value={filters.status || 'all'}
									onChange={handleStatusChange}
									label='Status'
									autoWidth
								>
									{statusOptions.map(statusOption => (
										<MenuItem key={statusOption.id} value={statusOption.id}>
											{statusOption.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					}
					title='Listagem de membros'
				/>
			)}
			<Divider />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding='checkbox'>
								{/* <Checkbox
									color='primary'
									checked={selectedAllMembers}
									indeterminate={selectedSomeCryptoOrders}
									onChange={handleSelectAllMembers}
								/> */}
							</TableCell>
							<TableCell>Irmão(â)</TableCell>
							<TableCell>Cidade</TableCell>
							<TableCell>Nascimento</TableCell>
							<TableCell>E-mail</TableCell>
							<TableCell>Cadastro</TableCell>
							{/* <TableCell>Detalhes</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedMembers.map((member, index) => {
							const isMemberSelected = selectedMemberId === member.id;
							return (
								<TableRow hover key={index} selected={isMemberSelected}>
									<TableCell padding='checkbox'>
										<Checkbox
											color='primary'
											checked={isMemberSelected}
											onChange={(event: ChangeEvent<HTMLInputElement>) =>
												handleSelectMember(event, member.id, member)
											}
											value={isMemberSelected}
										/>
									</TableCell>
									{/* Nome */}
									<TableCell>
										<Typography
											variant='body1'
											fontWeight='bold'
											color='text.primary'
											gutterBottom
											noWrap
										>
											{member.name}
										</Typography>
									</TableCell>

									{/* Cidade */}
									<TableCell>
										<Typography
											variant='body1'
											fontWeight='bold'
											color='text.primary'
											gutterBottom
											noWrap
										>
											{member.city}
										</Typography>
									</TableCell>

									{/* Nascimento */}
									<TableCell>
										<Typography
											variant='body1'
											fontWeight='bold'
											color='text.primary'
											gutterBottom
											noWrap
										>
											<Typography
												variant='body1'
												fontWeight='bold'
												color='text.primary'
												gutterBottom
												noWrap
											>
												{member.birth_date
													? format(parseISO(member.birth_date), "dd/MM/yyyy'")
													: 'NI'}
											</Typography>
										</Typography>
									</TableCell>

									{/* Email */}
									<TableCell align='left'>
										<Typography
											variant='body1'
											fontWeight='bold'
											color='text.primary'
											gutterBottom
											noWrap
										>
											{member.email}
										</Typography>
									</TableCell>

									<TableCell align='left'>
										{getStatusLabel(member.status)}
									</TableCell>

									{/* Ações */}
									{/* <TableCell align='left'>
										<Tooltip title='Detalhe' arrow>
											<IconButton
												sx={{
													'&:hover': {
														background: theme.colors.primary.lighter,
													},
													color: theme.palette.primary.main,
												}}
												color='inherit'
												size='small'
											>
												<VisibilityIcon fontSize='small' />
											</IconButton>
										</Tooltip>
										<Tooltip title='Excluir' arrow>
											<IconButton
												sx={{
													'&:hover': { background: theme.colors.error.lighter },
													color: theme.palette.error.main,
												}}
												color='inherit'
												size='small'
											>
												<DeleteTwoToneIcon fontSize='small' />
											</IconButton>
										</Tooltip>
									</TableCell> */}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Box p={2}>
				<TablePagination
					component='div'
					count={filteredMembers.length}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleLimitChange}
					labelRowsPerPage={'Registros por página'}
					page={page}
					rowsPerPage={limit}
					rowsPerPageOptions={[5, 10, 15, 30]}
				/>
			</Box>
		</Card>
	);
};

MembersTable.propTypes = {
	members: PropTypes.array.isRequired,
};

MembersTable.defaultProps = {
	members: [],
};
