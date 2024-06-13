import { format } from 'date-fns';

export const formatDate = (date, dateFormat = 'yyyy-MM-dd') => {
    return format(new Date(date), dateFormat);
};