import { ClipboardList, HomeOutline, PaperAirplane } from "heroicons-react";

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
    title: "تلگرام",
    path: "/telegram",
    icons: (
      <PaperAirplane className="w-6 h-6 p-1 transition rotate-45 border-2 rounded-full " />
    ),
  },
];
