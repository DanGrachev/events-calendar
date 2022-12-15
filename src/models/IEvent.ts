import {PresetStatusColorType} from "antd/es/_util/colors";

export interface IEvent {
    id: string;
    author: string;
    guests: string[];
    date: string;
    title: string;
    description: string;
    status: PresetStatusColorType;
}