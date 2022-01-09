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

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';

import { IParametersContext } from '@core/types/IParametersContext';
import { schema } from './schema';
import { useAuth } from '@hooks/useAuth';

import { useMembers } from '@hooks/useMembers';
import { ISupplementary } from '@core/types/ISupplementary.model';
import { registration } from '@core/services/RegistrationService';
import { useNavigate } from 'react-router-dom';

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
    control,
    formState: { errors }
  } = useForm<ISupplementary>({
    mode: 'onSubmit',
    defaultValues: useMemo(() => {
      return {
        ...activeMember?.supplementary
      };
    }, [activeMember]),

    resolver: yupResolver(schema),
    shouldUseNativeValidation: false
  });

  const supplementaryData = watch();

  const sendData = () => {
    registration(supplementaryData, user?.userId, 'supplementary');
    navigate('/registration/ecclesiastical');
  };

  return (
    <>
      {user && (
        <Card>
          <CardHeader title="Informações Complementares" />
          <Divider />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(sendData)}>
              <Grid container spacing={2} sx={{ pb: 1 }}>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="marital_status"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="marital_status"
                        select
                        label="Estado Civil"
                        {...register('marital_status')}
                        error={errors.marital_status?.message !== undefined}
                        helperText={errors.marital_status?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.maritalStatusOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="spouse_name"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="spouse_name"
                        label="Nome do Cônjuge"
                        name="spouse_name"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('spouse_name')}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="wedding_date"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="wedding_date"
                        label="Data de Casamento"
                        name="wedding_date"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('wedding_date')}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="schooling"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="schooling"
                        select
                        label="Escolaridade"
                        required
                        {...register('schooling')}
                        error={errors.schooling?.message !== undefined}
                        helperText={errors.schooling?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.schoolingOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="profession"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="profession"
                        label="Profissão"
                        name="profession"
                        required
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('profession')}
                        error={errors.profession?.message !== undefined}
                        helperText={errors.profession?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="father_name"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="father_name"
                        label="Nome do Pai"
                        name="father_name"
                        required
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('father_name')}
                        error={errors.father_name?.message !== undefined}
                        helperText={errors.father_name?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="mother_name"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="mother_name"
                        label="Nome da Mãe"
                        name="mother_name"
                        required
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('mother_name')}
                        error={errors.mother_name?.message !== undefined}
                        helperText={errors.mother_name?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
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
