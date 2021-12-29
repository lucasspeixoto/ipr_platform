import { useContext } from 'react';
import { ListSubheader, List } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { MenuItems } from './items';
import { styled } from '@mui/material/styles';

import { NavLink as RouterLink } from 'react-router-dom';

import { Button, ListItem } from '@mui/material';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import ChurchIcon from '@mui/icons-material/Church';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import CalculateIcon from '@mui/icons-material/Calculate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import { SidebarContext } from '@contexts/SidebarContext';

const icons = {
  '/registration/profile': <AccountBoxTwoToneIcon />,
  '/registration/personal': <ContactPhoneIcon />,
  '/registration/supplementary': <PersonIcon />,
  '/registration/ecclesiastical': <ChurchIcon />,
  '/admin/list': <TableChartIcon />,
  '/admin/statistics': <InsertChartIcon />,
  '/admin/data': <LegendToggleIcon />,
  '/finance/register': <CalculateIcon />,
  '/finance/gains': <AddCircleOutlineIcon />,
  '/finance/expenses': <RemoveCircleOutlineIcon />,
  '/finance/dashboards': <DashboardCustomizeIcon />
};

const MenuWrapper = styled(List)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 2)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(List)(
  ({ theme }) => `
    &.MuiList-root {
      padding: 0;

      .MuiList-root .MuiList-root .MuiListItem-root .MuiButton-root {
        font-weight: normal !important;
      }

      .MuiListItem-root {
        padding: 2px ${theme.spacing(2)};
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          justify-content: flex-start;
          font-size: ${theme.typography.pxToRem(13)};
          padding-top: ${theme.spacing(0.8)};
          padding-bottom: ${theme.spacing(0.8)};
          position: relative;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(4)};

            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              font-size: ${theme.typography.pxToRem(9)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
    
          .MuiButton-startIcon,
          
          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(26)};
            margin-right: ${theme.spacing(1.5)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            display: none;
           
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            
          }
        }

        &.Mui-children {
          flex-direction: column;
          line-height: 1;
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px ${theme.spacing(0)};

            .MuiButton-root {
              font-size: ${theme.typography.pxToRem(13)};
              padding: ${theme.spacing(0.5, 2, 0.5, 6.5)};

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`
);

interface SideBarMenuProps {
  menuItems: MenuItems[];
}

export const SidebarMenu: React.FC<SideBarMenuProps> = ({ menuItems }) => {
  const location = useLocation();

  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <>
      {menuItems.map((section) => (
        <MenuWrapper
          key={section.heading}
          subheader={
            <ListSubheader component="div" disableSticky>
              {section.heading}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            {section.items.map((item, index) => (
              <ListItem component="div" key={index}>
                <Button
                  className={
                    item.link === location.pathname ? 'Mui-active' : ''
                  }
                  component={RouterLink}
                  onClick={toggleSidebar}
                  to={item.link}
                  startIcon={icons[item.link]}
                >
                  {item.name}
                </Button>
              </ListItem>
            ))}
          </SubMenuWrapper>
        </MenuWrapper>
      ))}
    </>
  );
};
