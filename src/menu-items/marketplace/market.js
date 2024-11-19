// assets
import { IconDashboard, IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const market = {
  id: 'Community',
  title: 'Community',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Community',
      type: 'item',
      url: '/marketplace',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default market;
