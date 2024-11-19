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
  
  const marketUtilities = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
      // {
      //   id: 'payments',
      //   title: 'Payments',
      //   type: 'item',
      //   url: '/marketplace/payments',
      //   icon: icons.IconCurrencyRupee,
      //   breadcrumbs: false
      // },
      // {
      //   id: 'users',
      //   title: 'Users',
      //   type: 'item',
      //   url: '/marketplace/users',
      //   icon: icons.IconUser,
      //   breadcrumbs: false
      // },
      {
        id: 'users',
        title: 'Membership',
        type: 'item',
        url: '/marketplace/advertise',
        icon: icons.IconUser,
        children: [
          {
            id: 'banner',
            title: 'Banner',
            type: 'item',
            url: '/dashboard/banner',
            breadcrumbs: false
          },
          {
            id: 'news',
            title: 'News',
            type: 'item',
            url: '/dashboard/news',
            breadcrumbs: false
          },
          {
            id: 'promo',
            title: 'Promo',
            type: 'item',
            url: '/dashboard/promo',
            breadcrumbs: false
          },
          {
            id: 'success-story',
            title: 'Success Story',
            type: 'item',
            url: '/dashboard/success-story',
            breadcrumbs: false
          }
        ]
        
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        url: '/marketplace/settings',
        icon: icons.IconSettings,
        breadcrumbs: false
      }
    ]
  };
  
  export default marketUtilities;
  