// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconPaperBag,
  IconCurrency,
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

const upSkillsUtilities = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'payments',
      title: 'Payments',
      type: 'item',
      url: '/upSkills/payments',
      icon: icons.IconCurrencyRupee,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/upSkills/users',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/upSkills/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default upSkillsUtilities;
