import React from 'react';
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
import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';
import { Button } from '@mui/material';
import { IPersonal } from '@core/types/IPersonal';
import { IParametersContext } from '@core/types/IParametersContext';

interface IFormFieldsProps {
  parameters: IParametersContext;
}

const schema = yup
  .object({
    name: yup.string().trim().required(Messages.required).min(3, Messages.min),
    sex: yup.string().trim().required(Messages.required),
    birth_date: yup.string().trim().required(Messages.required),
    cep: yup
      .string()
      .trim()
      .matches(/^[0-9]{8}$/, Messages.invalidcep)
      .required(Messages.required),
    state: yup.string().trim().required(Messages.required),
    complement: yup.string().trim().required(Messages.required),
    address: yup.string().trim().required(Messages.required),
    city: yup.string().trim().required(Messages.required),
    district: yup.string().trim().required(Messages.required),
    number: yup.string().trim().required(Messages.required),
    rg: yup.string().trim().required(Messages.required),
    cpf: yup.string().trim().required(Messages.required),
    email: yup
      .string()
      .required(Messages.required)
      .matches(
        /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
        Messages.invalidemail
      ),
    cellphone: yup.string().trim().required(Messages.required),
    telephone: yup.string().trim(),
    naturalness: yup.string().trim().required(Messages.required)
  })
  .required();

export const FormFields: React.FC<IFormFieldsProps> = ({ parameters }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IPersonal>({
    resolver: yupResolver(schema)
  });

  const personalData = watch();

  const sendData = () => {
    console.log(personalData);
  };

  return (
    <Card>
      <CardHeader title="Formulário" />
      <Divider />

      <CardContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' }
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(sendData)}
        >
          {/* Nome | Sexo | Nascimento */}
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome Completo"
              name="name"
              defaultValue="Lucas Peixoto"
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
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              defaultValue="lucas.sacramoni@gmail.com"
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

          <Box p={1} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              onClick={handleSubmit(sendData)}
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
