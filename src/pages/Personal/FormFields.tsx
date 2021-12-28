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
import { Button } from '@mui/material';
import { IPersonal } from '@core/types/IPersonal';
import { IParametersContext } from '@core/types/IParametersContext';
import { schema } from './schema';
import { useAuth } from '@hooks/useAuth';
import { registerPersonalData } from '@core/services/RegistrationService';
import { useMembers } from '@hooks/useMembers';

interface IFormFieldsProps {
  parameters: IParametersContext;
}

export const FormFields: React.FC<IFormFieldsProps> = ({ parameters }) => {
  const { user } = useAuth();
  const { activeMember } = useMembers();

  const {
    register,
    handleSubmit,
    watch,
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
    registerPersonalData(personalData, user?.userId);
  };

  return (
    <>
      {user && (
        <Card>
          <CardHeader title="Formulário" />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }
              }}
              onSubmit={handleSubmit(sendData)}
            >
              <Box p={0} component="div" sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit(sendData)}
                  sx={{ mt: 0.5, mb: 0.5 }}
                >
                  Enviar
                </Button>
              </Box>

              {/* Nome | Sexo | Nascimento */}
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  name="name"
                  {...register('name')}
                  disabled
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="sex"
                  select
                  label="Sexo"
                  defaultValue="Masculino"
                  {...register('sex')}
                  error={errors.sex?.message !== undefined}
                  helperText={errors.sex?.message}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {parameters.sexOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="birth_date"
                  label="Data de Nascimento"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  {...register('birth_date')}
                  error={errors.birth_date?.message !== undefined}
                  helperText={errors.birth_date?.message}
                />
              </div>

              {/* CEP | Estado | Cidade */}
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  name="cep"
                  {...register('cep')}
                  error={errors.cep?.message !== undefined}
                  helperText={errors.cep?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  select
                  label="Estado"
                  defaultValue="SP"
                  {...register('state')}
                  error={errors.state?.message !== undefined}
                  helperText={errors.state?.message}
                >
                  {parameters.stateOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  {...register('city')}
                  error={errors.city?.message !== undefined}
                  helperText={errors.city?.message}
                />
              </div>

              {/* Endereço | Bairro | Número | Complemento */}
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Endereço"
                  name="address"
                  {...register('address')}
                  error={errors.address?.message !== undefined}
                  helperText={errors.address?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="district"
                  label="Bairro"
                  name="district"
                  {...register('district')}
                  error={errors.district?.message !== undefined}
                  helperText={errors.district?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="number"
                  type="number"
                  label="Número"
                  name="number"
                  {...register('number')}
                  error={errors.number?.message !== undefined}
                  helperText={errors.number?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="complement"
                  label="Complemento"
                  name="complement"
                  {...register('complement')}
                  error={errors.complement?.message !== undefined}
                  helperText={errors.complement?.message}
                />
              </div>
              {/* RG | CPF | E-mail */}
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="rg"
                  label="RG"
                  name="rg"
                  {...register('rg')}
                  error={errors.rg?.message !== undefined}
                  helperText={errors.rg?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  {...register('cpf')}
                  error={errors.cpf?.message !== undefined}
                  helperText={errors.cpf?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  {...register('email')}
                  disabled
                />
              </div>
              {/* Celular | Telefone | Naturalidade */}
              <div>
                <TextField
                  margin="normal"
                  fullWidth
                  id="cellphone"
                  label="Celular"
                  name="cellphone"
                  {...register('cellphone')}
                  error={errors.cellphone?.message !== undefined}
                  helperText={errors.cellphone?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="telephone"
                  label="Telefone"
                  name="telephone"
                  {...register('telephone')}
                />
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
              </div>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
