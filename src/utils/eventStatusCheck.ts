import {PresetStatusColorType} from "antd/es/_util/colors";
import dayjs from "dayjs";


export const statusCheck = (eventDate: string): PresetStatusColorType => {
    const today = dayjs().format('YYYY.MM.DD');
    if (today > eventDate) {
        return 'error'
    }
    return 'processing'
}