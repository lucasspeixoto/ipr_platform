import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';

export const schema = yup
  .object({
    marital_status: yup.string().trim().required(Messages.required),
    spouse_name: yup.string().trim(),
    wedding_date: yup.string().trim(),
    schooling: yup.string().trim().required(Messages.required),
    profession: yup.string().trim().required(Messages.required),
    father_name: yup.string().trim().required(Messages.required),
    mother_name: yup.string().trim().required(Messages.required)
  })
  .required();
