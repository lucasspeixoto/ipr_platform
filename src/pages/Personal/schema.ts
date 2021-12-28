import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';

export const schema = yup
  .object({
    name: yup.string().trim(),
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
    email: yup.string().trim(),
    cellphone: yup.string().trim().required(Messages.required),
    telephone: yup.string().trim(),
    naturalness: yup.string().trim().required(Messages.required)
  })
  .required();
