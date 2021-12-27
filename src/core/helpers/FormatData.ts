import { format, parseISO } from 'date-fns';

export const formatDate = (key: string, field: string): string => {
  const dates = ['birth_date', 'wedding_date', 'baptism_date'];
  if (dates.includes(key)) {
    return format(parseISO(field), "dd/MM/yyyy'");
  } else {
    return field;
  }
};
