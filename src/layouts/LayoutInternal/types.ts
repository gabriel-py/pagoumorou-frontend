export type LayoutProps = {
    children: import('react').ReactNode;
}
export type MenuItemProps = {
    id: string;
    href: string;
    label: string;
    icon?: JSX.Element;
    current?: boolean;
};