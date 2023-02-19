import { MutableRefObject } from "react";
export interface ModalPropsType {
    children?: React.ReactNode;
    styles?: {
        width?: string;
        height?: string;
    };
    show: boolean;
    onCloseModal: () => void;
    hideCloseButton?: boolean;
    closeButtonSize?: string;
    closeButtonSrc?: string;
    offAutoClose?: boolean;
    onBGAnimation?: boolean;
    onModalOpenAnimation?: boolean;
}
export interface ModalPropsUITypes {
    _ref?: MutableRefObject<HTMLDivElement>;
    _contentsRef?: MutableRefObject<HTMLDivElement>;
}
