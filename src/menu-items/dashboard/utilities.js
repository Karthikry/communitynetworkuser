// assets
import { Check, Logout, Payment, People } from '@mui/icons-material';
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconPaperBag,
  IconCurrencyRupee,
  IconCertificate,
  IconAd2
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSettings,
  IconUser,
  IconCurrencyRupee,
  IconCertificate,
  IconAd2,
  Check,
  Payment,
  People,
  Logout

  
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    // {
    //   id: 'ads',
    //   title: 'Ads',
    //   type: 'collapse',
    //   icon: icons.IconAd2,
    //   url: null,
    //   children: [
    //     {
    //       id: 'banner',
    //       title: 'Banner',
    //       type: 'item',
    //       url: '/dashboard/banner',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'news',
    //       title: 'News',
    //       type: 'item',
    //       url: '/dashboard/news',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'promo',
    //       title: 'Promo',
    //       type: 'item',
    //       url: '/dashboard/promo',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'success-story',
    //       title: 'Success Story',
    //       type: 'item',
    //       url: '/dashboard/success-story',
    //       breadcrumbs: false
    //     }
    //   ]
    // },


    // {
    //   id: 'notification',
    //   title: 'Notifications',
    //   type: 'collapse',
    //   icon: icons.IconAd2,
    //   url: null,
    //   children: [
    //     {
    //       id: 'notification',
    //       title: 'Notifications', 
    //       type: 'item',
    //       url: '/dashboard/notification',
    //       breadcrumbs: false
    //     }
    //   ]
    // },



    

    // {
    //   id: 'certificate',
    //   title: 'Certificate',
    //   type: 'item',
    //   url: '/dashboard/certificate',
    //   icon: icons.IconCertificate,
    //   breadcrumbs: false
    // },


    {
      id: 'subscription',
      title: 'Subscription',
      type: 'item',
      url: '/dashboard/subscription',
      icon: icons.Payment,
      breadcrumbs: false
    },
    {
      id: 'requests',
      title: 'Requests',
      type: 'item',
      url: '/dashboard/requests',
      icon: icons.Check,
      breadcrumbs: false
    },

    {
      id: 'membership',
      title: 'Membership',
      type: 'item',
      url: '/dashboard/membership',
      icon: icons.People,
      breadcrumbs: false
    },
    
    
    
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/dashboard/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    // {
    //   id: 'users',
    //   title: 'Users',
    //   type: 'item',
    //   url: '/dashboard/users',
    //   icon: icons.Logout,
    //   breadcrumbs: false
    // },
  ]
};

export default utilities;
