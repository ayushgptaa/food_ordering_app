import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={30} height={30} />;

const sidebarConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('fe:home')
  },
  {
    title: 'Promote',
    path: '/dashboard/promote',
    icon: getIcon(peopleFill)
  },
  {
    title: 'My orders',
    path: '/dashboard/my-orders',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Menu',
    path: '/dashboard/menu',
    icon: getIcon('feather:grid')
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: getIcon('feather:settings')
  },
  {
    title: 'Set Hours',
    path: '/dashboard/sethours',
    icon: getIcon('feather:clock')
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
