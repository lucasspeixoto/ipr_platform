import React, { useState, useMemo } from 'react';
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
import { IPersonal } from '@core/types/IPersonal';
import { IParametersContext } from '@core/types/IParametersContext';
import { schema } from './schema';
import { useAuth } from '@hooks/useAuth';
import { registration } from '@core/services/RegistrationService';
import { useMembers } from '@hooks/useMembers';
import { useNavigate } from 'react-router-dom';
import { SnackbarMessage } from '@components/elements/SnackbarMessage';
import { SnackBarMessageProps } from '@core/types/ISnackbarMessage';

interface IFormFieldsProps {
  parameters: IParametersContext;
}

export const FormFields: React.FC<IFormFieldsProps> = ({ parameters }) => {
  const { user } = useAuth();
  const { activeMember } = useMembers();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<SnackBarMessageProps>({
    open: false,
    severity: null,
    message: null
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<IPersonal>({
    mode: 'onSubmit',
    defaultValues: useMemo(() => {
      return {
        name: user?.name,
        email: user?.email,
        ...activeMember?.personal
      };
    }, [user, activeMember]),

    resolver: yupResolver(schema),
    shouldUseNativeValidation: false
  });

  const personalData = watch();

  const sendData = () => {
    registration(personalData, user?.userId, 'personal');
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Dados Pessoais Cadastrados com sucesso.'
    });

    navigate('/registration/supplementary');
  };

  return (
    <>
      {user && (
        <Card>
          <CardHeader title="Informações Pessoais" />
          <Divider />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(sendData)}>
              <Grid container spacing={2} sx={{ pb: 1 }}>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Nome Completo"
                    name="name"
                    {...register('name')}
                    disabled
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="sex"
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
                        id="control"
                        select
                        label="Sexo"
                        {...register('sex')}
                        error={errors.sex?.message !== undefined}
                        helperText={errors.sex?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.sexOptions.map((option) => (
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
                    name="birth_date"
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
                        id="control"
                        label="Data de Nascimento"
                        {...register('birth_date')}
                        error={errors.birth_date?.message !== undefined}
                        helperText={errors.birth_date?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="cep"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="control"
                        label="CEP"
                        required
                        {...register('cep')}
                        error={errors.cep?.message !== undefined}
                        helperText={errors.cep?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="state"
                        select
                        label="Estado"
                        required
                        {...register('state')}
                        error={errors.state?.message !== undefined}
                        helperText={errors.state?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.stateOptions.map((option) => (
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
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="city"
                        label="Cidade"
                        name="city"
                        required
                        {...register('city')}
                        error={errors.city?.message !== undefined}
                        helperText={errors.city?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="address"
                        label="Endereço"
                        name="address"
                        required
                        {...register('address')}
                        error={errors.address?.message !== undefined}
                        helperText={errors.address?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="district"
                        label="Bairro"
                        name="district"
                        required
                        {...register('district')}
                        error={errors.district?.message !== undefined}
                        helperText={errors.district?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="number"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="number"
                        label="Numero"
                        name="number"
                        type="number"
                        required
                        {...register('number')}
                        error={errors.number?.message !== undefined}
                        helperText={errors.number?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="complement"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="complement"
                        label="Complemento"
                        name="complement"
                        required
                        {...register('complement')}
                        error={errors.complement?.message !== undefined}
                        helperText={errors.complement?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="rg"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="rg"
                        label="RG"
                        name="rg"
                        required
                        {...register('rg')}
                        error={errors.rg?.message !== undefined}
                        helperText={errors.rg?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        required
                        {...register('cpf')}
                        error={errors.cpf?.message !== undefined}
                        helperText={errors.cpf?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    {...register('email')}
                    disabled
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="cellphone"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="cellphone"
                        label="Celular"
                        name="cellphone"
                        required
                        {...register('cellphone')}
                        error={errors.cellphone?.message !== undefined}
                        helperText={errors.cellphone?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="telephone"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="telephone"
                        label="Telefone"
                        name="telephone"
                        {...register('telephone')}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  {' '}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="naturalness"
                    label="Naturalidade"
                    name="naturalness"
                    {...register('naturalness')}
                    error={errors.naturalness?.message !== undefined}
                    helperText={errors.naturalness?.message}
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
      {snackbar.open && (
        <SnackbarMessage
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={setSnackbar}
        />
      )}
    </>
  );
};
