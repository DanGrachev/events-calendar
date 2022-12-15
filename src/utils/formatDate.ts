import dayjs, {Dayjs} from "dayjs";


export const formatDate = (date: Dayjs, format: string): string => {
    return dayjs(date).format(format);
}