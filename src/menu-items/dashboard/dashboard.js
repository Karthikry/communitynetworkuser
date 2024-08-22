// assets
import { IconDashboard, IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
