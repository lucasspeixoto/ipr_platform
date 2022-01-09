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
    control,
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
                  <Controller
                    name="membership"
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
                        id="membership"
                        select
                        label="Membresia"
                        {...register('membership')}
                        error={errors.membership?.message !== undefined}
                        helperText={errors.membership?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.membershipOption.map((option) => (
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
                    name="craft"
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
                        id="craft"
                        select
                        label="Oficio"
                        {...register('craft')}
                        error={errors.craft?.message !== undefined}
                        helperText={errors.craft?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.craftOption.map((option) => (
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
                    name="communities"
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
                        id="communities"
                        select
                        label="Igreja de origem"
                        {...register('communities')}
                        error={errors.communities?.message !== undefined}
                        helperText={errors.communities?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.communitiesOption.map((option) => (
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
                    name="interests"
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
                        id="interests"
                        select
                        label="Interesse"
                        {...register('interests')}
                        error={errors.interests?.message !== undefined}
                        helperText={errors.interests?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.interestsOption.map((option) => (
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
                    name="baptism"
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
                        id="baptism"
                        select
                        label="Batizado"
                        {...register('baptism')}
                        error={errors.baptism?.message !== undefined}
                        helperText={errors.baptism?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {parameters.baptismOption.map((option) => (
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
                    name="baptism_date"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="baptism_date"
                        label="Data de Batismo"
                        name="baptism_date"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('baptism_date')}
                        error={errors.baptism_date?.message !== undefined}
                        helperText={errors.baptism_date?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />

                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      value={baptismDate}
                      onChange={(date) => {
                        setBaptismDate(date);
                        setValue('baptism_date', baptismDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          fullWidth
                          id="baptism_date"
                          label="Data de Batismo"
                          InputLabelProps={{
                            shrink: true
                          }}
                          {...register('baptism_date')}
                        />
                      )}
                    />
                  </LocalizationProvider> */}
                </Grid>
                <Grid item md={4} xs={12}>
                  <Controller
                    name="baptism_shepherd"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        id="baptism_shepherd"
                        label="Pastor de Batismo"
                        name="baptism_shepherd"
                        InputLabelProps={{
                          shrink: true
                        }}
                        {...register('baptism_shepherd')}
                        error={errors.baptism_shepherd?.message !== undefined}
                        helperText={errors.baptism_shepherd?.message}
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
