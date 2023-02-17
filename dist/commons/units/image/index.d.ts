import { CSSProperties } from "react";
interface IProps {
    src: string;
    styles?: CSSProperties;
    className?: string;
}
export default function Image({ src, styles, className }: IProps): JSX.Element;
export {};
