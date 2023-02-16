import { ReactElement } from "react";
export interface IProps {
    children?: ReactElement<any, any> | string;
    styles?: {
        width: string;
        height: string;
    };
    show: boolean;
}
export default function _Modal({ children, show, styles }: IProps): JSX.Element;
