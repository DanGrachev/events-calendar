import dayjs, {Dayjs} from "dayjs";

export const rules = {
    required: (message: string = 'This field is required') => ({
        required: true,
        message
    }),
    isDatePassed: (message: string) => ({
        validator: (_: any, date: Dayjs) => {
            if (date) {
                const today = dayjs().format('YYYY.MM.DD');
                if (today <= date.format('YYYY.MM.DD')) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(message));
            }
        }
    })
}
