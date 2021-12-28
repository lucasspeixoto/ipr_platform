import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  MenuItem,
  Box
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';

import { IParametersContext } from '@core/types/IParametersContext';
import { schema } from './schema';
import { useAuth } from '@hooks/useAuth';

import { useMembers } from '@hooks/useMembers';
import { registration } from '@core/services/RegistrationService';
import { useNavigate } from 'react-router-dom';
import { IEcclesiastical } from '@core/types/IEcclesiastical.model';

interface IFormFieldsProps {
  parameters: IParametersContext;
}

export const FormFields: React.FC<IFormFieldsProps> = ({ parameters }) => {
  const { user } = useAuth();
  const { activeMember } = useMembers();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IEcclesiastical>({
    mode: 'onSubmit',
    defaultValues: useMemo(() => {
      return {
        ...activeMember?.ecclesiastical
      };
    }, [activeMember]),

    resolver: yupResolver(schema),
    shouldUseNativeValidation: false
  });

  const ecclesiasticalData = watch();

  const sendData = () => {
    registration(ecclesiasticalData, user?.userId, 'ecclesiastical');
    navigate('/registration/resume');
  };

  return (
    <>
      {user && (
        <Card>
          <CardHeader title="Informações Eclesiásticas" />
          <Divider />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(sendData)}>
              <Grid container spacing={2} sx={{ pb: 1 }}>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="membership"
                    select
                    label="Membresia"
                    defaultValue="Membro Comungante"
                    {...register('membership')}
                    error={errors.membership?.message !== undefined}
                    helperText={errors.membership?.message}
                  >
                    {parameters.membershipOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="craft"
                    select
                    label="Oficio"
                    defaultValue="Pastor"
                    {...register('craft')}
                    error={errors.craft?.message !== undefined}
                    helperText={errors.craft?.message}
                  >
                    {parameters.craftOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="communities"
                    select
                    label="Igreja de origem"
                    defaultValue="Assembléia de Deus"
                    {...register('communities')}
                    error={errors.communities?.message !== undefined}
                    helperText={errors.communities?.message}
                  >
                    {parameters.communitiesOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="interests"
                    select
                    label="Interesse"
                    defaultValue="Louvor"
                    {...register('interests')}
                    error={errors.interests?.message !== undefined}
                    helperText={errors.interests?.message}
                  >
                    {parameters.interestsOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="baptism"
                    select
                    label="Batizado"
                    defaultValue="Não"
                    {...register('baptism')}
                    error={errors.baptism?.message !== undefined}
                    helperText={errors.baptism?.message}
                  >
                    {parameters.baptismOption.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="baptism_date"
                    label="Data de Batismo"
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                    {...register('baptism_date')}
                    error={errors.baptism_date?.message !== undefined}
                    helperText={errors.baptism_date?.message}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="baptism_shepherd"
                    label="Pastor de Batismo"
                    name="baptism_shepherd"
                    {...register('baptism_shepherd')}
                    error={errors.baptism_shepherd?.message !== undefined}
                    helperText={errors.baptism_shepherd?.message}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',

                  mt: 2
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit(sendData)}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
