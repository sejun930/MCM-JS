import { ReactElement } from "react";
export interface ModalPropsType {
    children?: ReactElement<any, any> | string;
    styles?: {
        width: string;
        height: string;
    };
    show: boolean;
    onCloseModal: () => void;
    hideCloseButton?: boolean;
    closeButtonStyles?: {
        width?: string;
        height?: string;
        src?: string;
    };
    offAutoClose?: boolean;
    offAnimation?: boolean;
}
