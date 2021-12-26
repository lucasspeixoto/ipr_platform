import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';

import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle='#draggable-dialog-title'
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

interface ConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirmation: () => void;
	title: string;
	description: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	open,
	onClose,
	onConfirmation,
	title,
	description,
}) => {
	return (
		<Dialog
			open={open}
			onClose={() => onClose()}
			PaperComponent={PaperComponent}
			aria-labelledby='draggable-dialog-title'
		>
			<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
				{title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={() => onClose()}>
					Cancelar
				</Button>
				<Button onClick={() => onConfirmation()}>Confirmar</Button>
			</DialogActions>
		</Dialog>
	);
};
