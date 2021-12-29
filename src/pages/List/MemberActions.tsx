import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMembers } from '@hooks/useMembers';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ConfirmationModal } from './ConfirmationModal';
import { IMemberDetail } from '@core/types/IMemberDetail';
import { useNavigate } from 'react-router-dom';

interface MemberActionsProps {
  selectedMemberId: string;
  selectedMember: IMemberDetail;
}

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

export const MemberActions: React.FC<MemberActionsProps> = ({
  selectedMemberId,
  selectedMember
}) => {
  const { deleteMember, getSelectedMember } = useMembers();
	const navigate = useNavigate();

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const openDialogConfirmationQuestion = () => {
    setOpenConfirmation(true);
  };

  const deleteMemberHandler = () => {
    deleteMember(selectedMemberId);
    setOpenConfirmation(false);
  };

  const getMemberDetail = () => {
    getSelectedMember(selectedMemberId);
		navigate('/admin/detail')
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={openDialogConfirmationQuestion}
          >
            Excluir Cadastro
          </ButtonError>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<VisibilityIcon fontSize="small" />}
            onClick={getMemberDetail}
          >
            Detalhes
          </Button>
        </Box>
      </Box>

      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onConfirmation={deleteMemberHandler}
        title={`Excluir membro - ${selectedMember.name}`}
        description="Tem certeza que deseja realmente excluir este membro ? Esta ação vai
				remover todos os dados permanentemente da base."
      />
    </>
  );
};
