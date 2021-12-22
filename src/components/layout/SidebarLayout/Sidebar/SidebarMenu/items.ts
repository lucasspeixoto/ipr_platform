import { ReactNode } from "react";

import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

export interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: "",
    items: [
      {
        name: "Overview",
        link: "/overview",
        icon: DesignServicesTwoToneIcon,
      },
    ],
  },
  {
    heading: "Cadastro",
    items: [
      {
        name: "Dados Pessoais",
        link: "/registration/personal",
        icon: BrightnessLowTwoToneIcon,
      },
      {
        name: "Dados Complementares",
        link: "/registration/supplementary",
        icon: MmsTwoToneIcon,
      },
      {
        name: "Dados Eclesiásticos",
        link: "/registration/ecclesiastical",
        icon: MmsTwoToneIcon,
      },
    ],
  },
  {
    heading: "Área Administrativa",
    items: [
      {
        name: "Listagem de membros",
        link: "/admin/detail",
        icon: TableChartTwoToneIcon,
      },
      {
        name: "Estatisticas",
        link: "/admin/statistics",
        icon: AccountCircleTwoToneIcon,
      },
      {
        name: "Dados",
        link: "/admin/data",
        icon: AccountCircleTwoToneIcon,
      },
    ],
  },
];

export default menuItems;
