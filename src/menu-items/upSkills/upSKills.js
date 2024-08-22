// assets
import { IconDashboard, IconLayoutDashboard } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const upSKills = {
  id: 'upSkills',
  title: 'UpSkills',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'UpSKills',
      type: 'item',
      url: '/upSkills',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    }
  ]
};

export default upSKills;
