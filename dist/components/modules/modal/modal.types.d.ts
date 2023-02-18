/// <reference types="react" />
export interface ModalPropsType {
    children?: React.ReactNode;
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
