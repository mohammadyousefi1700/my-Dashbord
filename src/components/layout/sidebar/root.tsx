import { ClipboardList, HomeOutline, ShoppingBag } from "heroicons-react";

type SidebarLinkProps = {
  title: string;
  path: string;
  icons?: JSX.Element;
};

export const sidebarLink: SidebarLinkProps[] = [
  {
    path: "/",
    title: "خانه",
    icons: <HomeOutline className="w-5 h-5 " />,
  },
  {
    title: "کوت",
    path: "/Quotes",
    icons: <ClipboardList className="w-5 h-5" />,
  },
  {
    title: "فروش ها",
    path: "/sales",
    icons: <ShoppingBag className="w-5 h-5" />,
  },
];
