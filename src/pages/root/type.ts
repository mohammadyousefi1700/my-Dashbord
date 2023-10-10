import { ReactNode } from "react";

export type RouteType = {
  path: string;
  element?: ReactNode;
  index?: boolean;
  layoutConfig?: LayoutConfigProps;
};
export type LayoutConfigProps = {
  title?: string;
  navbarProps?: NavbarProps;
  children?: ReactNode;
};
export type NavbarProps = { logo?: ReactNode; leftContent?: ReactNode };
