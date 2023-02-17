export default function CommonsHooksComponents(): {
    componentRender: (Component: () => JSX.Element) => JSX.Element;
    getAllComponentsClassName: (defaultClass: string, className?: string) => string;
};
