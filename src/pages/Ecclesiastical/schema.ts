import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';

export const schema = yup
  .object({
    membership: yup.string().trim().required(Messages.required),
    craft: yup.string().trim().required(Messages.required),
    communities: yup.string().trim().required(Messages.required),
    interests: yup.string().trim().required(Messages.required),
    baptism: yup.string().trim().required(Messages.required),
    baptism_date: yup.string().trim(),
    baptism_shepherd: yup.string().trim()
  })
  .required();
