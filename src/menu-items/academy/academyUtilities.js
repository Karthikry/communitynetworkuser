// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconPaperBag,
  IconCurrencyRupee
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconPaperBag,
  IconCurrencyRupee
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const academyUtilities = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/academy/payments',
      icon: icons.IconCurrencyRupee,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/academy/users',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/academy/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default academyUtilities;
